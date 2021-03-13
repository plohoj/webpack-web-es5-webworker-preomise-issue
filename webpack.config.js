const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: './src/scripts/main.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    // <------ For IE11
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    useBuiltIns: 'usage',
                                    corejs: 3,
                                }],
                            ],
                        },
                    },
                    // ------>
                    'ts-loader',
                ]
            },
        ],
    },
    target: ['web', 'es5'], // For IE11
    mode: 'development',
    resolve: {
        extensions : ['.js', '.ts'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head',
        }),
        // <------ For IE11
        new webpack.BannerPlugin({
            raw: true,
            banner: `if (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.Promise === "undefined") {
                importScripts("/polyfill/es6-promise.auto.min.js");
            }`,
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: "./node_modules/es6-promise/dist/es6-promise.auto.min.js", to: "./polyfill/es6-promise.auto.min.js" },
            ],
        }),
        // ------>
    ],
    devtool: 'inline-nosources-source-map',
    devServer: { port: 3400 },
};
