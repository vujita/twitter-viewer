/**
 * Created by vuthasone on 8/30/2016.
 */
"use strict";
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();
const {
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_TOKEN_SECRET,
    PORT
} = process.env;

console.log('Following Keys are loaded from twitter', {
    TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_SECRET,
    TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_TOKEN_SECRET
});

//Check if .env file was loaded with all needed
if (!TWITTER_CONSUMER_KEY || !TWITTER_CONSUMER_SECRET
    || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_TOKEN_SECRET) {
    throw new Exception('Unable to load .env file, or missing required variables');
}

//using let
let server = express();

server.get('/', function (req, res) {
    const html = ReactDOMServer.renderToStaticMarkup(<h1>Hello World2 again</h1>);
    res.send(html);
});

server.use('/', routes);

server.listen(PORT || 8080, function () {
    console.log('Example server listening on port 3000!');
});