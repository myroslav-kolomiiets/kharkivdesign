var gulp = require('gulp');
var browserSync = require('browser-sync').create();;
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var coffee = require('gulp-coffee');
var imagemin = require('gulp-imagemin');


// Static server
gulp.task('serve', ['stylus', 'pug', 'coffee'], function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });

    gulp.watch('src/**/*.styl', ['stylus']);
    gulp.watch('src/**/*.pug', ['pug']);
    gulp.watch('src/**/*.coffee', ['coffee']);
    gulp.watch('build/*.*').on('change', browserSync.reload);
});

//Сжатие и перемещение изображений
gulp.task('compress-images', function () {
    gulp.src('src/assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
});

// Компиляция файлов Stylus
gulp.task('stylus', function(){
  return gulp.src('src/assets/kharkivdesign.styl')
  .pipe(stylus())
  .pipe(gulp.dest('build/css/'))
  .pipe(browserSync.stream());
});

// Компиляция файлов PUG
gulp.task('pug', function(){
  return gulp.src('src/index.pug')
  .pipe(pug())
  .pipe(gulp.dest('build/'))
  .pipe(browserSync.stream());
});

// Компиляция файлов Coffee
gulp.task('coffee', function(){
  return gulp.src('src/**/*.coffee')
  .pipe(coffee())
  .pipe(gulp.dest('build/js/'))
  .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);