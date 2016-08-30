/**
 * Created by vuthasone on 8/30/2016.
 */
"use strict";
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import routes from './routes';
//using let
let server = express();

server.get('/', function (req, res) {
    const html = ReactDOMServer.renderToStaticMarkup(<h1>Hello World2 again</h1>);
    res.send(html);
});

server.use('/', routes);

server.listen(process.env.PORT || 8080, function () {
    console.log('Example server listening on port 3000!');
});