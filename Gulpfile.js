var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var hbsfy = require('hbsfy');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var LessAutoprefixPlugin = require('less-plugin-autoprefix');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');

var config = {
  PORT: 8080,
  SRC_DIR: 'src/',
  BUILD_DIR: 'build/'
};

var lessAutoprefixPlugin = new LessAutoprefixPlugin({ browsers: '> 1%' });


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
    .pipe(browserSync.reload({ stream: true }));
});


gulp.task('styles', function() {
  return gulp.src(config.SRC_DIR + 'styles/index.less', { base: '.' })
    // .pipe(sourcemaps.init())
    .pipe(less({
      plugins: [lessAutoprefixPlugin]
    }))
    .pipe(minifyCSS())
    .pipe(rename('bundle.min.css'))
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.BUILD_DIR + 'css'))
    .pipe(browserSync.reload({ stream: true }));
});


gulp.task('html', function() {
  return gulp.src(config.SRC_DIR + 'index.html')
    .pipe(gulp.dest(config.BUILD_DIR))
    .pipe(browserSync.reload({ stream: true }));
});


gulp.task('build', ['scripts', 'styles', 'html']);

gulp.task('server', ['build'], function() {
  browserSync({
    port: config.PORT,
    server: {
      baseDir: config.BUILD_DIR
    }
  });

  gulp.watch(config.SRC_DIR + 'app/**/*.js', ['scripts']);
  gulp.watch(config.SRC_DIR + 'styles/**/*.less', ['styles']);
  gulp.watch(config.SRC_DIR + 'index.html', ['html']);
});
