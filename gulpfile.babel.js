import { task, src, dest, series, watch } from 'gulp';
import concat from 'gulp-concat';
const browserSync = require('browser-sync').create();
import image from 'gulp-image';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

import sass, { logError } from 'gulp-sass';

import scripts from './scripts';
import styles from './styles';

task('css', function () {
    return src(styles)
        .pipe(concat('main.scss'))
        .pipe(dest('./dist/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

task('sass', function () {
    return src(styles)
        .pipe(concat('main.scss'))
        .pipe(sass().on('error', logError))
        .pipe(dest('./dist/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
})

task('vendorJS', function () {
    return src(scripts)
        .pipe(concat('vendor.js'))
        // .pipe(uglify())
        .pipe(dest('./dist/assets/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

task('js', function () {
    return src(["./src/app/**/*.js"])
        .pipe(babel({ compact: false, presets: ['@babel/env'] }))
        .pipe(concat('scripts.js'))
        // .pipe(uglify())
        .pipe(dest('./dist/assets/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

task('image', function () {
    return src('./src/assets/img/*')
        .pipe(image())
        .pipe(dest('./dist/assets/img'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

task('fonts', function (done) {
    return src(['./node_modules/@fortawesome/fontawesome-free/webfonts/*'])
        .pipe(dest('./dist/assets/webfonts'));

});

task('html', function () {
    return src('./src/app/**/*.html')
        .pipe(dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

task('build', series(['sass', 'vendorJS', 'js', 'image', 'fonts', 'html']), function (done) {
});

task('browser-sync', function (done) {
    browserSync.init({
        open: false,
        server: {
            baseDir: 'dist',
        }
    });
    done()
});

task('watch', function (done) {
    // gulp.watch('./src/assets/css/**/*.css', gulp.series(['css']));
    watch('./src/assets/scss/**/*.scss', series(['sass']));
    watch('./src/assets/js/**/*.js', series(['js']));
    watch('./src/app/**/*.js', series(['js']));
    watch('./src/app/**/*.html', series(['html']));
    done();
});



task('start', series(['build', 'watch', 'browser-sync']), function (done) {
    devMode = true;
    // gulp.start(['build', 'browser-sync']);

    done();
});