var gulp = require('gulp');
var riot = require('gulp-riot');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify');
var babel = require('gulp-babel');

gulp.task('riot', function () {
    gulp.src('./src/**/*.tag')
        .pipe(riot({brackets:'{{ }}'}))
        .pipe(concat('riot-mui.js'))
        .pipe(minify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('mixins', function () {
    gulp.src('./src/**/*.es6')
        .pipe(babel())
        .pipe(concat('riot-mui-mixins.js'))
        .pipe(minify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('sass', function () {
    gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('riot-mui.min.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/styles/'));
});