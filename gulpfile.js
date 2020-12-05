const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const image = require('gulp-image');
const babel = require('gulp-babel');
 
const scripts = require('./scripts');
const styles = require('./styles');
// var gutil = require('gulp-util'); 

const reload = browserSync.reload;

gulp.task('css', function() {
    return gulp.src(styles)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
 
gulp.task('js', function() {
    return gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(babel({ compact: false, presets: ['@babel/env'] }))
        .pipe(gulp.dest('./dist/assets/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
 
gulp.task('image', function () {
    return gulp.src('./src/assets/img/*')
        .pipe(image())
        .pipe(gulp.dest('./dist/assets/img'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
 
gulp.task('fonts', function() {
    return gulp.src(['./node_modules/font-awesome/fonts/fontawesome-webfont.*'])
        .pipe(gulp.dest('./dist/assets/fonts/'));
});
 
gulp.task('html', function() {
    return gulp.src('./src/app/**/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
 
gulp.task('build', gulp.series(['css', 'js', 'image', 'fonts', 'html']), function(done) {
    // return gulp.start(['css', 'js', 'image', 'fonts', 'html'])
});
 
gulp.task('browser-sync', function(done) {
    browserSync.init({
        open: false,
        server: {
            baseDir: 'dist',
        }
    });
    done()
});

gulp.task('watch', function(done) {
    gulp.watch('./src/assets/css/**/*.css', gulp.series(['css']));
    gulp.watch('./src/assets/js/**/*.js', gulp.series(['js']));
    gulp.watch('./src/app/**/*.js', gulp.series(['js']));
    gulp.watch('./src/app/**/*.html', gulp.series(['html']));
    done();
});


 
gulp.task('start', gulp.series(['build', 'watch','browser-sync']), function(done) {
    devMode = true;
    // gulp.start(['build', 'browser-sync']);
    
    done();
});