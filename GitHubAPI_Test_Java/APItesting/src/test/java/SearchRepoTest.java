import static io.restassured.RestAssured.given;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import com.example.search_api.support.Constants;
import com.example.search_api.support.Utils;

import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

public class SearchRepoTest {
    
    private RequestSpecification requestSpec;
    private Utils api;

    @BeforeEach
    void setup() {
        
        requestSpec = given()
                .baseUri(Constants.BASE_URL)
                .auth().oauth2(Constants.TOKEN);

        api = new Utils(requestSpec); 
    }
    
    static String[] invalidRepoQueries() {
        return Utils.invalidQueryProvider("repo");
    }
    static String[] RepoQueryProvider() {
    return Constants.REPO_QUERIES;
    }

    @ParameterizedTest(name = "Invalid query test: {0}")
    @MethodSource("invalidRepoQueries")
    void testInvalidQueries(String query) {
        Response response = api.searchWithRetry(Constants.SEARCH_REPO_ENDPOINT, query);
        api.assertInvalidQuery(response);
    }

    @ParameterizedTest(name = "Valid query test: {0}")
    @MethodSource("RepoQueryProvider")
    void testValidQueries(String query) {
        Response response = api.searchWithRetry(Constants.SEARCH_REPO_ENDPOINT, query);
        api.assertValidQuery(response, query,"schemas/search_repo_schema.json");
    }
}
