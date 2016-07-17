var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sym = require('gulp-sym');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');

var tsProject = ts.createProject('tsconfig.json');

gulp.task(
  'compile',
  [
    'compile-ts',
    'compile-html',
    'compile-scss',
    'compile-symlink'
  ]
);

gulp.task('compile-ts', function () {
  return tsProject.src()
    .pipe(plumber())
    .pipe(ts(tsProject))
    .pipe(ts({
      out: 'output.js'
    }))
    .pipe(gulp.dest('app/'));
});

gulp.task(
  'compile-html',
  function () {
    gulp.src('src/**/*.html')
      .pipe(gulp.dest('app'));
  }
);

gulp.task(
  'compile-scss',
  function () {
    gulp.src('src/**/*.scss')
      .pipe(sass({ includePaths: ['node_modules'] }).on('error', sass.logError))
      .pipe(gulp.dest('app'));
  }
);

gulp.task(
  'compile-symlink',
  function () {
    gulp.src('node_modules/font-awesome/fonts')
      .pipe(sym('app/main/renderer/fonts', { force: true }));
  }
);

gulp.task(
  'watch',
  function () {
    gulp.watch('src/**/*', ['compile']);
  }
);
