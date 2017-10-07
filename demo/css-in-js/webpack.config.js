module.exports = {
    devtool: 'inline-source-map',
    entry: './index.ts',
    output: {
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        loaders: [{test: /\.tsx?$/, loader: 'ts-loader'}],
    },
};
