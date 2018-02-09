const config = require('./webpack.config.cjs.js');

config.output.filename = 'freestyler.umd.min.js';
config.output.library = 'freestyler';
config.output.libraryTarget = 'umd';

module.exports = config;
