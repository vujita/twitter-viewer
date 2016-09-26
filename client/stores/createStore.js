/**
 * Created by vnguyen on 9/1/16.
 */
import {createStore as makeStore, combineReducers, applyMiddleware, compose} from "redux";
import {routerReducer} from "react-router-redux";
import loggerMiddleware from "../middlewares/logger";
import crashReporter from "../middlewares/crashReporter";
import userTweets from "../reducers/userTweets";
import reduxThunk from "redux-thunk";

/**
 * We want to export a method to create a store, so it will be quicker to do universal rendering, which I probably wont be able to get too
 * @param initialState
 */
const createStore = (initialState = {})=>(
    makeStore(
        combineReducers({
            routing: routerReducer,
            userTweets
        }),
        initialState,
        compose(
            applyMiddleware(
                reduxThunk,
                loggerMiddleware,
                crashReporter,
                // fetchTweetsMiddleWare
            ),
            //Attaches dev tools to chrome extension if active, may add an additional condition
            //http://zalmoxisus.github.io/redux-devtools-extension/
            //Get one of these extensions
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )
)
export default createStore;

