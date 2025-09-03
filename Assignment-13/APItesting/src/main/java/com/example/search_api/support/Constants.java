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

    public static final String[] INVALID_QUERIES = {
            "repo: A B C D E F G H I J K L M N O P",
            "",
    };

    // Code search queries
    public static final String[] CODE_QUERIES = {
            "filename:README.md",
            "filename:index.html repo:raghadjam/Exalt-QA-Training-2025-raghad-jamhour",
            "path:Assignment-5 repo:raghadjam/Exalt-QA-Training-2025-raghad-jamhour",
            "requests repo:raghadjam/Exalt-QA-Training-2025-raghad-jamhour",
            "language:python repo:raghadjam/Exalt-QA-Training-2025-raghad-jamhour",
            "filename:index.html path:Assignment-10 language:html",
    };

    // Commit search queries
    public static final String[] COMMIT_QUERIES = {
            "12 repo:raghadjam/Exalt-QA-Training-2025-raghad-jamhour",
            "author:raghadjam",
            "committer-date:>2025-01-01",
            "committer-email:raghadjamhour@gmail.com"
    };

    public static final String[] ISSUE_INVALID_QUERIES = {
            "label:enhancement",
    };

    // Issues and PR search queries
    public static final String[] ISSUE_QUERIES = {
            "cats and dogs is:pr",
            "is:open is:pr",
            "label:enhancement is:pr",
            "comments:500 is:pr",
            "updated_at:2014-03-03T18:58:10Z is:pr",
            "closed_at:>2013-02-12T13:22:01Z is:pr",
            "due_on:>2012-10-09T23:39:01Z is:pr"
    };

    // Invalid queries for Search Labels
    public static final String[] LABEL_INVALID_QUERIES = {
            "64778136 ", // missing 'q'
            " bug", // missing 'repository_id'
            "0 " // invalid repo ID
    };

    // Label search queries
    public static final String[] LABEL_QUERIES = {
            "64778136 bug",
    };

    // Repo search queries
    public static final String[] REPO_QUERIES = {
            "language:java", // search by language
            "topic:api", // search by topic
            "user:raghadjam", // search repos of user
            "stars:>50", // search repos with stars > 50
            "language:python stars:>100", // combine qualifiers
            "test", // simple keyword search
            "watchers_count:>15",
            "forks_count:>5",
            "open_issues_count:>5",
    };

    public static final String[] TOPIC_INVALID_QUERIES = {
            ""
    };

    // Topic search queries
    public static final String[] TOPIC_QUERIES = {
            "Q",
            "created:>2016-01-01"
    };

    public static final String[] USER_QUERIES = {
            "john", // username or name contains 'john'
            "location:Berlin", // users in Berlin
            "followers:>100", // users with more than 100 followers
            "repos:>50", // users with more than 50 repos
            "type:org", // organizations only
            "created:>2022-01-01", // created after Jan 1, 2022
            "in:login jane" // search 'jane' in username
    };
}