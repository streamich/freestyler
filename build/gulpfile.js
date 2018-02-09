const gulp = require('gulp');
const ts = require('gulp-typescript');
const config = require('../tsconfig.json');

gulp.task('build-ts', () => {
    return gulp
        .src(['../src/**/*.ts', '!../src/**/__tests__/**'])
        .pipe(
            ts({
                ...config.compilerOptions,
                target: 'es5',
                module: 'commonjs',
            })
        )
        .pipe(gulp.dest('../lib'));
});

gulp.task('build-modules', () => {
    return gulp
        .src(['../src/**/*.ts', '!../src/**/__tests__/**'])
        .pipe(
            ts({
                ...config.compilerOptions,
                target: 'ESNext',
                module: 'ESNext',
            })
        )
        .pipe(gulp.dest('../modules'));
});
