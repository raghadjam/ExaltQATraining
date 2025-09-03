import static io.restassured.RestAssured.given;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import com.example.search_api.support.Constants;
import com.example.search_api.support.Utils;

import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

public class SearchLabelTest {
    
    private RequestSpecification requestSpec;
    private Utils api;

    @BeforeEach
    void setup() {
        requestSpec = given()
                .baseUri(Constants.BASE_URL)
                .auth().oauth2(Constants.TOKEN);

        api = new Utils(requestSpec); 
    }
    
    static String[] invalidLabelQueries() {
        return Utils.invalidQueryProvider("label");
    }
            static String[] LabelQueryProvider() {
    return Constants.LABEL_QUERIES;
    }

    @ParameterizedTest(name = "Invalid query test: {0}")
    @MethodSource("invalidLabelQueries")
    void testInvalidQueries(String query) {
        Response response = api.search(Constants.SEARCH_LABEL_ENDPOINT, query);
        api.assertInvalidQuery(response);
    }

    @ParameterizedTest(name = "Valid query test: {0}")
    @MethodSource("LabelQueryProvider")
    void testValidQueries(String query) {
        Response response = api.search(Constants.SEARCH_LABEL_ENDPOINT, query);
        api.assertValidQuery(response, query,"schemas/search_label_schema.json");
    }
}
