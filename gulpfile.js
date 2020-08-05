var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
const { series } = require('gulp');
var browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

//browser-sync
gulp.task('serve', ['sass'], function () {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './',
    },
  });
  gulp.watch('./src/scss/*.scss', ['sass']);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

//sass
gulp.task('sass', function () {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(plumber([{ errorHandler: false }]))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

function sass() {
  console.log('guzel');
}

//pug
// gulp.task('views', function () {
//   return gulp
//     .src('./views/index.pug')
//     .pipe(pug())
//     .pipe(gulp.dest('./dist/'))
//     .on('end', reload);
// });

//gulp.task('run', [('sass', 'views')]);

// gulp.task('stream', function () {
//   // Endless stream mode
//   return watch('css/**/*.css', { ignoreInitial: false }).pipe(
//     gulp.dest('build')
//   );
// });

// gulp.task('callback', function () {
//   // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
//   return watch('css/**/*.css', function () {
//     gulp.src('css/**/*.css').pipe(gulp.dest('build'));
//   });
// });

// gulp.task('watch', function () {
//   gulp.watch('./src/scss/**/*.scss', ['scss']);
//   gulp.watch('./src/views/**/*.pug', ['views']);
// });

//gulp.task('default', ['run', 'watch']);

//gulp.task('default', gulp.series('browser-sync', 'watch'));

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });

////////////////////////////////////////////////////////////////////////////////////

const { src, dest, parallel, series, watch } = require('gulp');
// const pug = require('gulp-pug'); // Pug default view template
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const browsersync = require('browser-sync');
const path = require('path');

// Directories
var paths = {
  build: './build/',
  scss: './client/scss/',
  data: './client/data/',
  js: './client/js/',
};

function css() {
  return (
    src('client/scss/vendors/*.scss')
      .pipe(sourcemaps.init())
      // Stay live and reload on error
      .pipe(
        plumber({
          handleError: function (err) {
            console.log(err);
            this.emit('end');
          },
        })
      )
      .pipe(
        sass({
          includePaths: [paths.scss + 'vendors/'],
          outputStyle: 'compressed',
        }).on('error', function (err) {
          console.log(err.message);
          // sass.logError
          this.emit('end');
        })
      )
      .pipe(
        prefix(
          [
            'last 15 versions',
            '> 1%',
            'ie 8',
            'ie 7',
            'iOS >= 9',
            'Safari >= 9',
            'Android >= 4.4',
            'Opera >= 30',
          ],
          {
            cascade: true,
          }
        )
      )
      //.pipe(minifyCSS())
      .pipe(concat('bootstrap.min.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(dest('build/assets/css'))
  );
}

// browser-sync
function server(done) {
  if (browsersync) browsersync.init(syncConfig);
  done();
}

exports.serve = serve;
exports.sass = sass;

exports.default = gulp.series(serve);
