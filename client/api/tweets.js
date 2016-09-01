/**
 * Created by vnguyen on 9/1/16.
 */
export function fetchTweets(userName) {
    return $.ajax(`/api/tweets/${userName}`);
}