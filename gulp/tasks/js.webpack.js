'use strict';

module.exports = function() {
    var path = require('path');
    $.gulp.task('js:webpack', function () {
        return $.gulp.src('./source/js/*.js')
            .pipe($.plumber({
                errorHandler: $.gp.notify.onError(function (err) {
                    return {
                        title: 'webpack',
                        message: err.message
                    };
                })
            }))
            .pipe($.named())
            .pipe($.webpack({
            watch: false,
            // devtool: 'source-map',
            module: {
                loaders: [{
                    test: /\.js$/,
                    include: path.join(__dirname, './')
                }]
            }
        })).pipe($.gulp.dest($.config.root + '/assets/js'));
    });
};