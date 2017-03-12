'use strict';

module.exports = function() {
    $.gulp.task('copy_json', function() {
        return $.gulp.src('./source/*.json', { since: $.gulp.lastRun('copy_json') })
            .pipe($.gulp.dest($.config.root + '/assets'));
    });
};