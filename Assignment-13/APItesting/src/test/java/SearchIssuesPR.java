import com.example.search_api.support.Constants;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import com.example.search_api.support.Utils;

import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import static io.restassured.RestAssured.*;


public class SearchIssuesPR {

    private RequestSpecification requestSpec;
    private Utils api;

    @BeforeEach
    void setup() {
        
        requestSpec = given()
                .baseUri(Constants.BASE_URL)
                .auth().oauth2(Constants.TOKEN);

        api = new Utils(requestSpec); 
    }
    
    static String[] invalidIssueQueries() {
        return Utils.invalidQueryProvider("issue");
    }
        static String[] issuesQueryProvider() {
    return Constants.ISSUE_QUERIES;
    }

    @ParameterizedTest(name = "Invalid query test: {0}")
    @MethodSource("invalidIssueQueries")
    void testInvalidQueries(String query) {
        Response response = api.searchWithRetry(Constants.SEARCH_ISSUE_ENDPOINT, query);
        api.assertInvalidQuery(response);
    }

    @ParameterizedTest(name = "Valid query test: {0}")
    @MethodSource("issuesQueryProvider")
    void testValidQueries(String query) {
        Response response = api.searchWithRetry(Constants.SEARCH_ISSUE_ENDPOINT, query);
        api.assertValidQuery(response, query,"schemas/search_issues_schema.json");
    }
}
