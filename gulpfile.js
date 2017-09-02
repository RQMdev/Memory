'use strict';

var gulp        = require('gulp'),
    pug         = require('gulp-pug'),
    sass        = require('gulp-sass'),
    cssmin      = require('gulp-cssmin'),
    rename      = require('gulp-rename'),
    prefix      = require('gulp-autoprefixer'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    imagemin    = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['pug', 'sass', 'js'], function() {

    browserSync.init({
        server: './dist',
        browser: "chrome.exe"
    });

    gulp.watch('src/pug/**/*.pug', ['pug']);
    gulp.watch('src/sass/**/*.sass', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('./dist/js/*.js').on('change', browserSync.reload);
});

// Configure PUG tasks.
gulp.task('pug', function (){
  return gulp.src('./src/pug/*.pug')
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.stream());
});

// Configure CSS tasks.
gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.sass')
    .pipe(sass())
    .on('error', function (err) { console.log(err.message); })
    .pipe(prefix('last 2 versions'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Configure JS.
gulp.task('js', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Configure image stuff.
gulp.task('images', function () {
  return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function () {
  gulp.watch('src/pug/**/*.pug', ['pug']);
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('./dist/js/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['pug', 'sass', 'js', 'images', 'serve']);
