/**
 * Created by vnguyen on 8/31/16.
 */
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import dotenv from 'dotenv';
dotenv.load();
let {PRODUCTION} = process.env;
console.log('Production or not', PRODUCTION);
let devtool = PRODUCTION ? undefined : 'eval-source-map',
    index = path.join(__dirname, 'client/index.js'),
    entry = PRODUCTION ? {index} : ['webpack-hot-middleware/client?reload=true', index];

let config = {
    devtool,
    entry,
    output: {
        path: path.join(__dirname, '/public/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }, {
                test: /\.json?$/,
                loader: 'json'
            }, {
                test: /\.css$/,
                loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
            }
        ]
    }
};

export default config;