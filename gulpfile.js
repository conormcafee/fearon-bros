/*!
 * gulp
 * $ npm install gulp gulp-ruby-sass gulp-autoprefixer gulp-livereload gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-notify gulp-rename gulp-cache del --save-dev
 */
 
// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    prefix = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    //minifyHTML = require('gulp-minify-html'),
    del = require('del'),
    livereload = require('gulp-livereload');
 
// SASS
gulp.task('sass', function() {
    return sass('build/sass/main.scss', { style: 'expanded' })
    .pipe(prefix({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest('production/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('production/css'))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(livereload());
});
// Scripts
gulp.task('scripts', function() {
  return gulp.src(['build/js/fontFaceObserver.js', 'build/js/echo.js', 'build/js/photoswipe.js', 'build/js/photoswipe-ui-default.js', 'build/js/unslider.js', 'build/js/script.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('production/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('production/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Minify HTML
gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
  return gulp.src('./_site/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./_site'))
    gulp.src("./_site/*/*.html")
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest("./_site/./"));
});
 
// Clean
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js'], cb)
});
 
// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('sass', 'scripts');
});
 
// Watch
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('build/sass/**/*.scss', ['sass']);
  gulp.watch('build/js/*.js', ['scripts']);
 
});