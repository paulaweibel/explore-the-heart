var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require("gulp-rename"),
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    babel = require('gulp-babel'),
    browserify = require('gulp-browserify'),
    clean = require('gulp-clean'),
    sourcemaps = require('gulp-sourcemaps'),
    htmlmin = require('gulp-html-minifier'),
    browserSync = require('browser-sync'),
    jsImport = require('gulp-js-import');



var src = './src/',
    dist = './dist/';

var deploy      = require('gulp-gh-pages');


// #######################################################
// MINIFY SASS
gulp.task('scss', function () {

    gulp.src(src + 'assets/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename({
            basename: 'style'
        }))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(src + 'assets/css'))
        .pipe(browserSync.stream());

});



// #######################################################
// MINIFY JS
gulp.task('js', function () {

    gulp.src(src + 'assets/js/*.js')

        .pipe(browserSync.stream());


});





// #######################################################
// MINIFY HTML
gulp.task('html', function () {

    // gulp.src(dist + '*.html', {
    //         force: true
    //     })
    //     .pipe(clean());

    gulp.src(src + '*.html')

        .pipe(browserSync.stream());


});


gulp.task('image', function () {



    gulp.src(src + 'assets/images/*')

        .pipe(browserSync.stream());


});

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});





// #######################################################
// WATCH

gulp.task('starttheheart', function () {

    browserSync.init({
        server: './src'
    });
    gulp.watch('*.html', gulp.series('html'));
gulp.watch('app/css/*.css', gulp.series('scss'));
  gulp.watch('app/js/*.js', gulp.series('js'));
  gulp.watch('app/img/*', gulp.series('image'));

});