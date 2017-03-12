'use strict';

module.exports = function() {
  $.gulp.task('js:slider', function() {
    return $.gulp.src($.path.slider)
      .pipe($.gp.sourcemaps.init())
      .pipe($.gp.concat('slider.js'))
      .pipe($.gp.sourcemaps.write())
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};