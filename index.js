/**
 * Created by vuthasone on 8/30/2016.
 */
"use strict";
import express from 'express';
import React from 'react';
import routes from './routes';
import dotenv from 'dotenv';
import {setConfig as setTwitterCfg} from './utils/twitter';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';
import rimraf from 'rimraf';

//Load .env to process.env.*
dotenv.config();

//Pull values required from the .env file that are configurable
const {
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_TOKEN_SECRET,
    PRODUCTION_WEBPACK_WATCH
} = process.env;
const PRODUCTION = (process.env.PRODUCTION === 'true');
const SERVER_PORT = process.env.SERVER_PORT || 8080;
console.log('Following Keys are loaded from twitter', {
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_TOKEN_SECRET
});

//Check if .env file was loaded with all needed
if (!TWITTER_CONSUMER_KEY || !TWITTER_CONSUMER_SECRET
    || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_TOKEN_SECRET) {
    throw new Error('Unable to load .env file, or missing required variables');
} else {
    //Load util with keys
    setTwitterCfg({
        consumer_key: TWITTER_CONSUMER_KEY,
        consumer_secret: TWITTER_CONSUMER_SECRET,
        access_token_key: TWITTER_ACCESS_TOKEN,
        access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
    })
}
//Create web server
let server = express();

//Attach routes
server.use('/', routes);

//static files
const compiler = webpack(webpackConfig);
if (PRODUCTION === 'true') {
    /**
     * I chose to compile on the fly to make it very simple to run this in dev or prod mode and the build would be more abstracted
     */
    //clean public folder for a new build
    rimraf.sync('public');
    //Set public to be a static assets
    server.use(express.static('public'));
    const onCompile = (err, stats)=> {
        if (err) {
            console.error('Webpack error:', err);
        } else {
            console.log('webpack compiled');
        }
    };
    if (PRODUCTION_WEBPACK_WATCH) {
        compiler.watch({}, onCompile);
    } else {
        compiler.run(onCompile);
    }

} else {
    //Dev
    const middleware = webpackMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        contentBase: 'src',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    server.use(middleware);
    server.use(webpackHotMiddleware(compiler));
}

//Launch off of configured port or default of 8080
server.listen(SERVER_PORT, ()=> {
    console.log(`Example server listening on port ${SERVER_PORT}!`);
});
