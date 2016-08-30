/**
 * Created by vuthasone on 8/30/2016.
 */
"use strict";
import express      from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

//using let
let app = express();

app.get('/', function (req, res) {
    const html = ReactDOMServer.renderToStaticMarkup(<h1>Hello World2 again</h1>);
    res.send(html);
});

app.listen(process.env.PORT || 8080, function () {
    console.log('Example app listening on port 3000!');
});