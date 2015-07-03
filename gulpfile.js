var gulp = require('gulp');

var clean = require('gulp-clean');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');

var browsersync = require('browser-sync');

gulp.task('clean', [], function() {
  return gulp.src('public/**', {read: false})
    .pipe(clean());
});

gulp.task('scripts', ['clean'], function() {
  return browserify('./js/main.js')
    .transform(babelify)
    .bundle()
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public'));
});

gulp.task('views', ['clean'], function() {
  return gulp.src('views/**')
    .pipe(gulp.dest('./public'));
});

gulp.task('compile', ['scripts', 'views']);

gulp.task('bs', ['compile'], function () {
    browsersync({
      server: {
        baseDir: 'public'
      },
      port: 9090
    });
});

gulp.task('default', ['bs']);
