package com.example.search_api.support;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;
import static org.hamcrest.Matchers.anyOf;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.lessThan;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

public class Utils {

    private final RequestSpecification requestSpec;

    public Utils(RequestSpecification requestSpec) {
        this.requestSpec = requestSpec;
    }

public Response search(String endpoint, String query) {
    if (endpoint.equals(Constants.SEARCH_LABEL_ENDPOINT)) {
        String[] parts = query.split(" ", 2); 
        String repositoryId = parts[0]; 
        String q = parts[1]; 

        return requestSpec
                .queryParam("q", q)
                .queryParam("repository_id", repositoryId)
                .when()
                .log().all()
                .get(endpoint);
    } else {
        return requestSpec
                .queryParam("q", query)
                .when()
                .get(endpoint);
    }
}

    public void assertInvalidQuery(Response response) {
        response.then()
                .statusCode(Constants.STATUS_VALIDATION_FAILED)
                .body(matchesJsonSchemaInClasspath("schemas/error_response_schema.json"));
        anyOf(
                containsString(Constants.ERROR_VALIDATION_FAILED),
                containsString(Constants.ERROR_INVALID_INPUT),
                containsString((Constants.ERROR_INVALID_ISSUE_PR)));
    }

    public void assertValidQuery(Response response, String query, String schema) {
        response.then()

                .statusCode(Constants.STATUS_OK)
                .time(lessThan(5000L))
                .body("total_count", greaterThanOrEqualTo(1))
                .body(matchesJsonSchemaInClasspath(schema));
    }

    public static String[] invalidQueryProvider(String api) {
        if (api.equalsIgnoreCase("code") || api.equalsIgnoreCase("commit")
        || api.equalsIgnoreCase("repo")) {
            return Constants.INVALID_QUERIES;
        } else if ("issue".equalsIgnoreCase(api)) {
            return mergeArrays(Constants.INVALID_QUERIES, Constants.ISSUE_INVALID_QUERIES);
        } else if ("label".equalsIgnoreCase(api)) {
            return Constants.LABEL_INVALID_QUERIES;

        }
        else if ("topic".equalsIgnoreCase(api) || "user".equalsIgnoreCase(api)) {
            return Constants.TOPIC_INVALID_QUERIES;
        }
        return null;
    }

    private static String[] mergeArrays(String[] a, String[] b) {
        String[] merged = new String[a.length + b.length];
        System.arraycopy(a, 0, merged, 0, a.length);
        System.arraycopy(b, 0, merged, a.length, b.length);
        return merged;
    }
}
