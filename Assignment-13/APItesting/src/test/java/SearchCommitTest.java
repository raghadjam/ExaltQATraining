import com.example.search_api.support.Constants;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import com.example.search_api.support.Utils;

import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import static io.restassured.RestAssured.*;

public class SearchCommitTest {

    private RequestSpecification requestSpec;
    private Utils api;

    @BeforeEach
    void setup() {
        requestSpec = given()
                .baseUri(Constants.BASE_URL)
                .auth().oauth2(Constants.TOKEN);

        api = new Utils(requestSpec); 
    }
        static String[] commitQueryProvider() {
    return Constants.COMMIT_QUERIES;
    }
    
    static String[] invalidCommitQueries() {
        return Utils.invalidQueryProvider("commit");
    }

    @ParameterizedTest(name = "Invalid query test: {0}")
    @MethodSource("invalidCommitQueries")
    void testInvalidQueries(String query) {
        Response response = api.search(Constants.SEARCH_COMMIT_ENDPOINT, query);
        api.assertInvalidQuery(response);
    }

    @ParameterizedTest(name = "Valid query test: {0}")
    @MethodSource("commitQueryProvider")
    void testValidQueries(String query) {
        Response response = api.search(Constants.SEARCH_COMMIT_ENDPOINT, query);
        api.assertValidQuery(response, query,"schemas/search_commit_schema.json");
    }
}
