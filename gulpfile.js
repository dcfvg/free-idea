var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

var jsFiles = [
  './bower_components/jquery/dist/jquery.js',
  './bower_components/jquery-ui/jquery-ui.js',
  './bower_components/lodash/lodash.js'
  ];

gulp.task('serve', function() {
  connect.server({base: "./app"}, function (){
    browserSync({
      baseDir: "./app",
      proxy: '127.0.0.1:8000'
    });
  });

  gulp.watch('app/**/*.html').on('change', function () {browserSync.reload();});
  gulp.watch('./app/assets/less/*.less', ['less']);
  gulp.watch('./app/assets/js/*.js').on('change', function () {
    browserSync.reload();
  });
});

gulp.task('less', function() {
    return gulp.src('./app/assets/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./app/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src(jsFiles,{base: 'bower_components/'})
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/assets/js/'));
});

gulp.task('default', [ 'js', 'less', 'serve']);
