/**
 * Created by vnguyen on 9/1/16.
 */
import {actionTypes} from '../constants';
export function fetchTweets(userName) {
    return {
        type: actionTypes.LOAD_TWEETS_BY_USER,
        data: userName
    }
}

export function loadTweetsSuccess(user, tweets) {
    return {
        type: actionTypes.LOAD_TWEETS_BY_USER_SUCCESS,
        data: {
            user,
            tweets
        }
    }
}
export function loadTweetsFailure(user, err) {
    console.log(user, err)
    return {
        type: actionTypes.LOAD_TWEETS_BY_USER_FAILURE,
        data: {
            user, err
        }
    }
}