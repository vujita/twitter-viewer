/**
 * Created by vnguyen on 9/1/16.
 */
import {actionTypes} from '../constants';
console.log(actionTypes);

export function loadTweets(userName) {
    return {
        type: actionTypes.LOAD_TWEETS_BY_USER,
        data: userName
    }
}