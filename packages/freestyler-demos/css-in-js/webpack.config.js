var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ["transform-decorators-legacy"]
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
