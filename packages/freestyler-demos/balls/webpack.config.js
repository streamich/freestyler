const webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        index: "./index"
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        loaders: [{test: /\.tsx?$/, loader: 'ts-loader'}],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.FREESTYLER_PREFIX': JSON.stringify(process.env.FREESTYLER_PREFIX || '')
        }),
    ]
};
