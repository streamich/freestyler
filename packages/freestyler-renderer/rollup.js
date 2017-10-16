const rollup = require('rollup');
const filesize = require('rollup-plugin-filesize');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

async function build(inputOptions, outputOptions) {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    // generate code and a sourcemap
    const {code, map} = await bundle.generate(outputOptions);

    // or write the bundle to disk
    await bundle.write(outputOptions);
}

const plugins = () => [
    commonjs({
        // non-CommonJS modules will be ignored, but you can also
        // specifically include/exclude files
        include: 'node_modules/**', // Default: undefined
        exclude: ['node_modules/foo/**', 'node_modules/bar/**'], // Default: undefined
        // these values can also be regular expressions
        // include: /node_modules/

        // search for files other than .js files (must already
        // be transpiled by a previous plugin!)
        extensions: ['.js', '.coffee'], // Default: [ '.js' ]

        // if true then uses of `global` won't be dealt with by this plugin
        ignoreGlobal: false, // Default: false

        // if false then skip sourceMap generation for CommonJS modules
        sourceMap: false, // Default: true

        // explicitly specify unresolvable named exports
        // (see below for more details)
        namedExports: {'./module.js': ['foo', 'bar']}, // Default: undefined

        // sometimes you have to leave require statements
        // unconverted. Pass an array containing the IDs
        // or a `id => boolean` function. Only use this
        // option if you know what you're doing!
        ignore: ['conditional-runtime-dependency'],
    }),
    filesize(),
];

console.log('Building CommonJs');
build(
    {
        input: 'modules/index.js',
        plugins: plugins(),
    },
    {
        file: 'dist/common.js',
        format: 'cjs',
    }
);

console.log('Building UMD');
build(
    {
        input: 'modules/index.js',
        plugins: plugins(),
    },
    {
        file: 'dist/umd.js',
        format: 'umd',
        name: 'freestyler',
    }
);
