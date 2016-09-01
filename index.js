/**
 * Created by vuthasone on 8/30/2016.
 */
"use strict";
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import routes from './routes';
import dotenv from 'dotenv';
import {setConfig as setTwitterCfg} from './utils/twitter';
//Load .env to process.env.*
dotenv.config();
//Pull values required from the .env file that are configurable
const {
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_TOKEN_SECRET
} = process.env;
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

//Basic index path, this may change. I may not have enough time for my initial intention of server rendering
server.get('/', function (req, res) {
    const html = ReactDOMServer.renderToStaticMarkup(<h1>Hello World2 again</h1>);
    res.send(html);
});
//Attach routes
server.use('/', routes);
//Launch off of configured port or default of 8080
server.listen(SERVER_PORT, ()=> {
    console.log(`Example server listening on port ${SERVER_PORT}!`);
});