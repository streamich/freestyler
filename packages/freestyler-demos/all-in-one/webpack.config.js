module.exports = {
    devtool: 'inline-source-map',
    entry: {
        index: "./index",
        styled: "./styled",
        virtual: './virtual'
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
};
