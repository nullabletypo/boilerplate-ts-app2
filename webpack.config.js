const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const NotifierPlugin = require('webpack-notifier');
const BabiliPlugin = require('babili-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const compact = require('lodash.compact');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// ------------------------------------------------
// env
// ------------------------------------------------
const NODE_ENV = process.env.NODE_ENV || 'development';
const isProd = NODE_ENV === 'production';
const isDev = !isProd;

// ------------------------------------------------
// common config
// ------------------------------------------------
const common = {
    module: {
        rules: [
            {
                test: /\.(jsx?|tsx?)$/,
                exclude: /(\/node_modules\/|\.test\.tsx?$)/,
                // loader: 'light-ts-loader'
                loader: 'awesome-typescript-loader?module=es2015'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        `css-loader?importLoaders=1&minimize=${isProd}`,
                        'postcss-loader'
                    ]
                })
            }
        ]
    },
    plugins: compact([
        new NotifierPlugin({ title: 'Webpack' }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        }),
        isProd && new BabiliPlugin()
    ]),
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },
    devtool: isProd ? 'hidden-source-map' : 'inline-source-map'
};

// ------------------------------------------------
//  main bundle config
// ------------------------------------------------
const main = merge(common, {
    entry: {
        app: ['./src/index.ts', './src/index.css']
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].bundle.js'
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './src/index.ejs',
            hash: true,
            inject: false,
            env: NODE_ENV
        }),
        new ExtractTextPlugin({
            filename: '[name].bundle.css'
        })
    ]
});

// ------------------------------------------------
//  worker bundle config
// ------------------------------------------------
// const worker = merge(common, {
//     entry: { worker: './src/worker.ts' },
//     output: {
//         path: path.join(__dirname, 'public'),
//         filename: '[name].bundle.js'
//     }
// });

/* expose */
// module.exports = [main, worker];
module.exports = [main];
module.exports.common = common;
module.exports.main = main;
module.exports.worker = worker;

