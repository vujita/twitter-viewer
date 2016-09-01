/**
 * Created by vnguyen on 9/1/16.
 */
import userTweets from '../userTweets';
import {fetchTweets, loadTweetsSuccess, loadTweetsFailure} from '../../actions/loadTweets'
import {actionTypes} from '../../constants';
/**
 * Testing reducers is key to many things working
 */
describe('Testing userTweets reducer', ()=> {
    it('should not fail without paramaters, and returns an empty object', ()=> {
        expect(userTweets()).toEqual({});
    });
    it('should not mutate from any action type', ()=> {
        let state = {
            "Untouched": "STILL HERE"
        };
        expect(userTweets(state, {type: 'RANDOM'})).toBe(state);
    });
    it('Test fetchTweets action', ()=> {
        let orgState = {a: 1, b: 2},
            userName = 'test',
            newState = userTweets(orgState, fetchTweets(userName));
        //Empty tweets
        expect(newState.tweets).toEqual([]);
        //Username is set to currentTwitterUser
        expect(newState.currentTwitterUser).toBe(userName);
        //Should show it is loading
        expect(newState.loading).toEqual(true);
    });
    it('Test tweet success', ()=> {
        let orgState = {a: 1, b: 2},
            userName = 'test',
            tweets = [{id: 1337}],
            newState = userTweets(orgState, loadTweetsSuccess(userName, tweets));
        expect(newState.tweets).toBe(tweets);
        expect(newState.loading).toBeUndefined();
    });
    it('Test tweet failure', ()=> {
        let currentTwitterUser = 'Test',
            orgState = {
                currentTwitterUser,
                loading: true
            },
            err: [{message:'badStuff'}],
            newState = userTweets(orgState, loadTweetsFailure(currentTwitterUser,err));
        expect(newState.loading).toBeUndefined();
        expect(newState.err).toBe(err);
        expect(newState).to
    })
});