var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var hbsfy = require('hbsfy');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

var config = {
  PORT: 8080,
  SRC_DIR: './src/',
  BUILD_DIR: './build/',
};


gulp.task('scripts', function() {
  var bundler = browserify({
    entries: config.SRC_DIR + 'app/index.js',
    debug: true,
    transform: [hbsfy]
  });

  return bundler
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify()) // TODO: do not uglify when running dev environment
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.BUILD_DIR + 'js'))
    .pipe(connect.reload());
});


gulp.task('styles', function() {
  return gulp.src(config.SRC_DIR + 'styles/index.less', { base: '.' })
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(rename('bundle.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.BUILD_DIR + 'css'))
    .pipe(connect.reload());
});


gulp.task('html', function() {
  return gulp.src(config.SRC_DIR + 'index.html')
    .pipe(gulp.dest(config.BUILD_DIR))
    .pipe(connect.reload());
});


gulp.task('connect', function() {
  connect.server({
    root: config.BUILD_DIR,
    port: config.PORT,
    livereload: true
  });
});


gulp.task('watch', function() {
  gulp.watch(config.SRC_DIR + 'app/**/*.js', ['scripts']);
  gulp.watch(config.SRC_DIR + 'styles/**/*.less', ['styles']);
  gulp.watch(config.SRC_DIR + 'index.html', ['html']);
});


gulp.task('build', ['scripts', 'styles', 'html']);
gulp.task('server', ['build', 'connect', 'watch']);
