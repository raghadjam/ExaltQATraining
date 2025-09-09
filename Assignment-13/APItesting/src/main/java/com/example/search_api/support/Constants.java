package com.example.search_api.support;
import io.github.cdimascio.dotenv.Dotenv;

public class Constants {

    private static final Dotenv dotenv = Dotenv.load();

    public static final String TOKEN = dotenv.get("GITHUB_TOKEN");

    // Endpoints
    public static final String BASE_URL = "https://api.github.com";
    public static final String SEARCH_CODE_ENDPOINT = "/search/code";
    public static final String SEARCH_COMMIT_ENDPOINT = "/search/commits";
    public static final String SEARCH_ISSUE_ENDPOINT = "/search/issues";
    public static final String SEARCH_LABEL_ENDPOINT = "/search/labels";
    public static final String SEARCH_REPO_ENDPOINT = "/search/repositories";
    public static final String SEARCH_TOPIC_ENDPOINT = "/search/topics";
    public static final String SEARCH_USER_ENDPOINT = "/search/users";


    // HTTP codes
    public static final int STATUS_OK = 200;
    public static final int STATUS_VALIDATION_FAILED = 422;

    // Messages
    public static final String ERROR_VALIDATION_FAILED = "Validation Failed";
    public static final String ERROR_INVALID_INPUT = "ERROR_TYPE_QUERY_PARSING_FATAL unable to parse query!";
    public static final String ERROR_INVALID_ISSUE_PR = "Query must include 'is:issue' or 'is:pull-request'";
    public static final String ERROR_LANGUAGE =  "ERROR_TYPE_QUERY_PARSING_FATAL Unknown language:";

    public static final String[] INVALID_QUERIES = {
            "repo: A B C D E F G H I J K L M N O P",
            "",
            "a".repeat(257),
    };

    public static final String[] REPO_INVALID_QUEIRES = {
            "language:py"
    };

    public static final String[] CODE_INVALID_QUERIES = {
            "repo: A B C D E F G H I J K L M N O P",
            "",
            "language:py",
    };
    
    // Code search queries
    public static final String[] CODE_QUERIES = {
            "language:java per_page=0",
            "language:java per_page=20",
            "language:java per_page=-200",
            "language:java per_page=200",
            "filename:README.md",
            "filename:index.html repo:raghadjam/Exalt-QA-Training-2025-raghad-jamhour",
            "path:Assignment-5 repo:raghadjam/Exalt-QA-Training-2025-raghad-jamhour",
            "requests repo:raghadjam/Exalt-QA-Training-2025-raghad-jamhour",
            "filename:index.html path:Assignment-10 language:html",
            "language:java",
    };

    // Commit search queries
    public static final String[] COMMIT_QUERIES = {
            "12 repo:raghadjam/Exalt-QA-Training-2025-raghad-jamhour",
            "12 repo:raghadjam/Exalt-QA-Training-2025-raghad-jamhour sort=committer-date order=desc",
            "author:raghadjam",
            "committer-date:2025-01-01",
            "committer-email:raghadjamhour@gmail.com",
            "12 per_page=200",
            "12 per_page=-200",
            "12 per_page=0",
            "12 per_page=20",
    };

    public static final String[] ISSUE_INVALID_QUERIES = {
            "label:enhancement",  // Missing is:type
    };

    // Issues and PR search queries
    public static final String[] ISSUE_QUERIES = {
            "cats is:issue",
            "apple is:issue sort=comment order=asc",
            "label:enhancement is:issue",
            "is:issue updated:2019-04-30",
            "created:2019-04-30 is:issue",
            "per_page=200 is:issue state:open",
            "per_page=-200 is:issue state:open",
            "per_page=0 is:issue state:open",
            "per_page=20 is:issue state:open",
    };

    // Invalid queries for Search Labels
    public static final String[] LABEL_INVALID_QUERIES = {
            "64778136  ", // missing 'q'
            "  bug", // missing 'repository_id'
            "0  ", // invalid repo ID
    };

    // Label search queries
    public static final String[] LABEL_QUERIES = {
            "64778136 name:bug",
            "64778136 name:bug per_page=200",
            "64778136 name:bug per_page=-200",
            "64778136 name:bug per_page=0",
            "64778136 name:bug per_page=20",
    };

    // Repo search queries
    public static final String[] REPO_QUERIES = {
            "lang:java", // search by language
            "topic:api", // search by topic
            "user:raghadjam", // search repos of user
            "stars:50", // search repos with stars > 50
            "test", // simple keyword search
            "forks:5",
            "test sort=stars",
            "test per_page=200",
            "test per_page=-200",
            "test per_page=0",
            "test per_page=20",
    };

    public static final String[] TOPIC_INVALID_QUERIES = {
            "",
            "a".repeat(257)
    };

    // Topic search queries
    public static final String[] TOPIC_QUERIES = {
            "Q",
            "created:2020-01-01",
            "Q per_page=200",
            "Q per_page=-200",
            "Q per_page=0",
            "Q per_page=20",
            
    };

    public static final String[] USER_QUERIES = {
            "Ahmad", // username or name contains 'john'
            "type:org", // organizations only
            "Ahmad per_page=200",
            "Ahmad per_page=-200",
            "Ahmad per_page=20",
            "Ahmad per_page=0",
    };
}