/**
 * Created by vnguyen on 9/1/16.
 */
const $ = require('jquery');
/**
 * A method to abstract fetching tweets by user
 * @param userName
 * @returns {Promise}
 */
export function fetchTweets(userName) {
    return $.ajax(`/api/tweets/${userName}`);
}