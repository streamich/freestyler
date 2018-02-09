const {join} = require('path');

module.exports = {
    entry: join(__dirname, '..', 'src', 'index.ts'),

    output: {
        filename: 'freestyler.min.js',
        path: join(__dirname, '..', 'dist')
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        enforceExtension: false
    }
};
