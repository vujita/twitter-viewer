/**
 * Created by vnguyen on 9/1/16.
 */
import * as actions from '../actions'
import {actionTypes} from '../constants';
import {fetchTweets} from '../api';
import {LOCATION_CHANGE} from 'react-router-redux';

/**
 * I believe I can do this one better, but I didn't want to further deviating researching cleaner methodologies
 * or using another framework like redux-thunk. I have already somewhat veered off a bit
 * @param store
 */
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
                //Put on the end of the event loop, keep the ordering cleaner
                setTimeout(()=> {
                    getTweets(pathScreenName, dispatch, afterActionState);
                    dispatch(actions.fetchTweets(pathScreenName));
                }, 1);
            }
            break;
    }

    return result;
}
export default fetchTweetsMiddleware;
function getTweets(user, dispatch, state) {
    let {userTweets} = state;
    //Only fetch if there isn't an active fetch
    if (!userTweets.loading) {
        fetchTweets(user).then((r)=> {
            dispatch(actions.loadTweetsSuccess(r.screen_name, r.tweets))
        }).fail((err)=> {
            dispatch(actions.loadTweetsFailure(user, err.responseJSON))
        });
    }
}