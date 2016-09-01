/**
 * Created by vnguyen on 9/1/16.
 */
import * as actions from '../actions'
import {actionTypes} from '../constants';
import {fetchTweets} from '../api';
import {LOCATION_CHANGE} from 'react-router-redux';
const fetchTweetsMiddleware = store => next => action => {
    let {getState, dispatch} = store,
        result = next(action),
        afterActionState = getState();

    const {type, data, payload} = action;
    switch (type) {
        case actionTypes.LOAD_TWEETS_BY_USER:
            //Make call for explicit call
            getTweets(data, dispatch, afterActionState);
            break;
        case LOCATION_CHANGE:
            //Router change make the call then
            const pathScreenName = payload.pathname.replace(/\//g, '');
            if (pathScreenName) {
                getTweets(pathScreenName, dispatch, afterActionState);
            }
            break;
    }

    return result;
}
export default fetchTweetsMiddleware;
function getTweets(user, dispatch, state) {
    let {userTweets} = state;
    if (!userTweets.loading) {
        fetchTweets(user).then((r)=> {
            dispatch(actions.loadTweetsSuccess(r.screen_name, r.tweets))
        }).fail((err)=> {
            dispatch(actions.loadTweetsFailure(user, err.responseJSON))
        });
    }
}