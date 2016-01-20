import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';

import config from '../config';

gulp.task('css:dev', () => {
  return gulp.src(config.path.sass.files)
//    .pipe(sourcemaps.init())
    .pipe(sass())
//    .pipe(sourcemaps.write({includeContent: false}))
//    .pipe(sourcemaps.init({loadMaps: true})) // Load sourcemaps generated by sass
    .pipe(autoprefixer(config.autoprefixer))
    .on('error', config.handleError)
//    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dev.css))
    .on('error', config.handleError);
});

gulp.task('css:dist', () => {
  return gulp.src(config.path.sass.files)
    .pipe(sass())
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.dist.css))
    .on('error', config.handleError);
});
