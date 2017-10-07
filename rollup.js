const rollup = require('rollup');
const filesize = require('rollup-plugin-filesize');

async function build(inputOptions, outputOptions) {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    // generate code and a sourcemap
    const { code, map } = await bundle.generate(outputOptions);

    // or write the bundle to disk
    await bundle.write(outputOptions);
}

console.log('Building CommonJs');
build({
    input: 'modules/common.js',
    plugins: [
        filesize()
    ]
}, {
    file: 'dist/bundle.js',
    format: 'cjs',
});

