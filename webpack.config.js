/**
 * Created by vnguyen on 8/31/16.
 */
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import dotenv from 'dotenv';
dotenv.load();
let PRODUCTION = (process.env.PRODUCTION === 'true');
console.log('Production or not', PRODUCTION);
let devtool = PRODUCTION ? undefined : 'eval-source-map',
    index = path.join(__dirname, 'client/index.js'),
    entry = PRODUCTION ? {index} : ['webpack-hot-middleware/client?reload=true', index],
    corePlugins = [
        new HtmlWebpackPlugin({
            template: 'index.tpl.html',
            filename: 'index.html'
        }),
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    prodPlugins = [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devPlugins = [
        new webpack.HotModuleReplacementPlugin()
    ],
    plugins = PRODUCTION ? [...devPlugins, ...corePlugins] : [...devPlugins, ...corePlugins];
let config = {
    devtool,
    entry,
    output: {
        path: path.join(__dirname, '/public/'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    plugins,
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
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loaders: [
                    'file?name=assets/[name].[hash].[ext]',
                    'image-webpack'
                ]
            }, {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap')
            }
        ]
    },
    imageWebpackLoader: {
        pngquant: {
            quality: "65-90",
            speed: 4
        },
        svgo: {
            plugins: [
                {
                    removeViewBox: false
                },
                {
                    removeEmptyAttrs: false
                }
            ]
        }
    },
    postcss: function () {
        return [autoprefixer, precss];
    }

};

export default config;