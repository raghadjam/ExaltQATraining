package com.example.search_api.support;

import java.time.Instant;
import java.util.List;
import io.restassured.response.Response;
import org.json.simple.JSONObject;
import io.restassured.specification.RequestSpecification;
import org.json.simple.parser.JSONParser;
import java.io.InputStreamReader;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.lessThanOrEqualTo;
import static org.junit.Assert.assertTrue;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;
import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.lessThan;
import io.restassured.path.json.JsonPath;

public class Utils {

    private final RequestSpecification requestSpec;
    private static JSONObject selectorMap;

    static {
        try {
            JSONParser parser = new JSONParser();
            selectorMap = (JSONObject) parser.parse(
                    new InputStreamReader(
                            Utils.class.getResourceAsStream("selectors.json")));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String getMappedKey(String key) {
        Object val = selectorMap.get(key);
        return val.toString();
    }

    public Utils(RequestSpecification requestSpec) {
        this.requestSpec = requestSpec;
    }

    public Response search(String endpoint, String query) {
        Response response = null;

        if (endpoint.equals(Constants.SEARCH_LABEL_ENDPOINT)) {
            String[] parts = query.split("\\s+|\\+", 3);
            String repositoryId = parts[0];
            String q = parts[1];

            RequestSpecification spec = requestSpec
                    .queryParam("q", q)
                    .queryParam("repository_id", repositoryId);

            if (parts.length > 2)
                spec.queryParam("per_page", parts[2]);

            response = spec.when().get(endpoint);
        } else {
            String q = query;
            String per_page = extractParam(query, "per_page");
            String sort = extractParam(query, "sort");
            String order = extractParam(query, "order");

            if (per_page != null) q = q.replace("per_page=" + per_page, "").trim();
            if (sort != null) q = q.replace("sort=" + sort, "").trim();
            if (order != null) q = q.replace("order=" + order, "").trim();

            RequestSpecification spec = requestSpec.queryParam("q", q);
            if (per_page != null)
                spec.queryParam("per_page", per_page);
            if (sort != null)
                spec.queryParam("sort", sort);
            if (order != null)
                spec.queryParam("order", order);

            response = spec.when().get(endpoint);
        }

        return response;
    }

    public void assertInvalidQuery(Response response) {
        response.then()
                .statusCode(Constants.STATUS_VALIDATION_FAILED)
                .body(matchesJsonSchemaInClasspath("schemas/error_response_schema.json"))
                .body("message", anyOf(
                    containsString(Constants.ERROR_VALIDATION_FAILED),
                    containsString(Constants.ERROR_INVALID_INPUT),
                    containsString(Constants.ERROR_INVALID_ISSUE_PR),
                    containsString(Constants.ERROR_LANGUAGE)));
    }

    public void assertValidQuery(Response response, String query, String schema) {
        response.then()
                .statusCode(Constants.STATUS_OK)
                .time(lessThan(7000L))
                .body("total_count", greaterThanOrEqualTo(1))
                .body(matchesJsonSchemaInClasspath(schema));

        int itemsCount = response.jsonPath().getList("items").size();
        if (query.contains("sort=") || query.contains("order=")) {
            checkSortOrder(response, query);
        }
        assertContains(response, query);

        int perPage = 30;

        if (query.contains("per_page=")) {
            try {
                String part = query.split("per_page=")[1].split("\\s|&")[0];
                perPage = Integer.parseInt(part);
            } catch (Exception e) {
                perPage = 30;
            }

            if (perPage <= 0) {
                perPage = 30;
            } else if (perPage > 100) {
                perPage = 100;
            }
            assertThat("Number of items returned is incorrect", itemsCount, lessThanOrEqualTo(perPage));
        } else { // assert that defualt is 30
            assertThat("Number of items returned is incorrect", itemsCount, lessThanOrEqualTo(30));
        }
    }

    public static String[] invalidQueryProvider(String api) {
        if (api.equalsIgnoreCase("commit")) {
            return Constants.INVALID_QUERIES;
        } else if ("repo".equalsIgnoreCase(api)) {
            return mergeArrays(Constants.INVALID_QUERIES, Constants.REPO_INVALID_QUEIRES);
        } else if ("issue".equalsIgnoreCase(api)) {
            return mergeArrays(Constants.INVALID_QUERIES, Constants.ISSUE_INVALID_QUERIES);
        } else if ("label".equalsIgnoreCase(api)) {
            return Constants.LABEL_INVALID_QUERIES;
        } else if ("topic".equalsIgnoreCase(api) || "user".equalsIgnoreCase(api)) {
            return Constants.TOPIC_INVALID_QUERIES;
        } else if ("code".equalsIgnoreCase(api)) {
            return Constants.CODE_INVALID_QUERIES;
        }
        return null;
    }

    private static String[] mergeArrays(String[] a, String[] b) {
        String[] merged = new String[a.length + b.length];
        System.arraycopy(a, 0, merged, 0, a.length);
        System.arraycopy(b, 0, merged, a.length, b.length);
        return merged;
    }

    public void assertContains(Response response, String query) {
        JsonPath json = response.jsonPath();
        String[] selectors = query.split("\\s+|\\+");

        for (String selector : selectors) {
            if (!selector.contains(":") || selector.contains("=")) {
                continue;
            }

            String[] kv = selector.split(":", 2);
            String key = kv[0].trim();
            String expected = kv[1].trim();

            key = Utils.getMappedKey(key);

            List<Object> values = json.getList("items." + key);

            boolean found = values.stream().allMatch(item -> containsValue(item, expected));

            assertThat("Selector not found: " + selector, found, is(true));
        }
    }

    private boolean containsValue(Object obj, String expected) {
        if (obj instanceof List) {
            return ((List<?>) obj).stream()
                    .anyMatch(v -> v != null && v.toString().toLowerCase().contains(expected.toLowerCase()));
        } else if (obj != null) {
            return obj.toString().toLowerCase().contains(expected.toLowerCase());
        }
        return false;
    }

    private void checkSortOrder(Response response, String query) {
        String sortField = null;
        boolean descending = true;

        if (query.contains("sort=")) {
            sortField = query.split("sort=")[1].split("\\s|\\+")[0].trim();
        }

        if (query.contains("order=")) {
            String order = query.split("order=")[1].split("\\s|\\+")[0].trim();
            descending = order.equalsIgnoreCase("desc");
        }

        String key = Utils.getMappedKey(sortField);

        if (sortField != null) {
            List<Object> values = response.jsonPath().getList("items." + key);

            for (int i = 1; i < values.size(); i++) {
                Object prev = values.get(i - 1);
                Object curr = values.get(i);

                if (prev != null && curr != null) {
                    if (prev instanceof Number && curr instanceof Number) {
                        int p = ((Number) prev).intValue();
                        int c = ((Number) curr).intValue();
                        if (descending)
                            assertTrue(p >= c);
                        else
                            assertTrue(p <= c);

                    } else if (prev instanceof String && curr instanceof String) {
                        Instant p = Instant.parse((String) prev);
                        Instant c = Instant.parse((String) curr);
                        if (descending)
                            assertTrue(!p.isBefore(c));
                        else
                            assertTrue(!p.isAfter(c));
                    }
                }
            }
        }

    }

    public Response searchWithRetry(String endpoint, String query) {
        while (true) {
            Response response = search(endpoint, query);
            if (response.getStatusCode() != 403) {
                return response;
            }
            System.out.println("Rate limited. Waiting 60 seconds before retry...");
            try {
                Thread.sleep(60000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    
    private String extractParam(String query, String key) {
    if (query.contains(key + "=")) {
        String value = query.split(key + "=")[1].split("\\s|\\+")[0].trim();
        return value;
    }
    return null;
}
}