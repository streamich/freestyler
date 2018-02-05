const webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        index: "./index",
        styled: "./styled",
        balls: './balls',
        button: './button',
        todo: './todo',
        rule: './rule',
        StyleSheet: './StyleSheet',
        Styleit: './Styleit',
        jsxstyle: './jsxstyle',
        Component: './Component',
        css: './css',
        wrap: './wrap',
        demo1: './demo1',
        hyperstyle: './hyperstyle',
    },
    output: {
        path: __dirname + '/dist',
        filename: "[name].js"
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
