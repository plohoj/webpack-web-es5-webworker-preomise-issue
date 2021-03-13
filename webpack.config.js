const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: [
        'core-js/es/promise',
        './src/scripts/main.ts'
    ],
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
    ],
    devtool: 'inline-nosources-source-map',
    devServer: { port: 3400 },
};
