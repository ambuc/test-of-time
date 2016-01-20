import gulp from 'gulp';
import rimraf from 'rimraf';

import config from '../config';

gulp.task('clean:dev', () => {
  return rimraf.sync(config.dev.dir, {}, config.handleError);
});

gulp.task('clean:dist', () => {
  return rimraf.sync(config.dist.dir, {}, config.handleError);
});
