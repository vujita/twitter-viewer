/**
 * Created by vnguyen on 9/1/16.
 */
import {actionTypes} from '../constants';

export default function (state = {}, action = {type: ''}) {
    const {type, data} = action;
    switch (type) {
        case actionTypes.LOAD_TWEETS_BY_USER:
            state = {
                currentTwitterUser: data,
                loading: true,
                tweets: []
            };
            break;
        case actionTypes.LOAD_TWEETS_BY_USER_SUCCESS:
            state = {
                currentTwitterUser: state.currentTwitterUser,
                tweets: data.tweets
            }
            break;
        case actionTypes.LOAD_TWEETS_BY_USER_FAILURE:
            state = {
                currentTwitterUser: data.user,
                tweets: null,
                err: data.err
            }
            break;
    }

    return state;
}