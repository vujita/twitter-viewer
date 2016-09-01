/**
 * Created by vnguyen on 9/1/16.
 */
import {createStore as makeStore, combineReducers, applyMiddleware, compose} from 'redux';
import {routerReducer} from 'react-router-redux';
import loggerMiddleware from '../middlewares/logger';
import crashReporter from '../middlewares/crashReporter';

const createStore = (initialState = {})=>(
    makeStore(
        combineReducers({
            routing: routerReducer
        }),
        initialState,
        compose(
            applyMiddleware(loggerMiddleware, crashReporter),
            //Attaches dev tools to chrome extension if active, may add an additional condition
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )
)
export default createStore;

