// Require gulp packages
var gulp = require('gulp');
var sass = require('gulp-sass');
var js = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browsersync = require('browser-sync');
var reload = browsersync.reload;

// Task 1 - Compile and minify Sass
gulp.task('sass', function () {
  return gulp.src('./assets/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});

// Task 2 - Minify JS
gulp.task('js', function () {
  return gulp.src('./assets/js/*.js')
    .pipe(js())
    .pipe(gulp.dest('./assets/js/min'));
});

// Task 3 - Optimise images
// gulp.task('imagemin', function () {
//     gulp.src('./assets/images/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('./assets/images'))
// });

// Task 4 - Set up Browsersync

gulp.task('browser-sync', function() {
  browsersync.init({
  proxy: 'gulp-wp.dev'
  });
});

gulp.task('reload', function () {
  browsersync.reload();
});

// Task 5 - Set up Watchers
gulp.task('watch', function() {
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
  gulp.watch('./assets/js/*.js', ['js']);
  gulp.watch(['./assets/sass/**/*.scss', './assets/js/*.js', '*.php'], ['reload']);
});

// Default Gulp tasks
gulp.task('default', ['sass', 'js', 'browser-sync', 'watch' ]);
