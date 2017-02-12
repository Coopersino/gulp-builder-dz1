'use strict';

module.exports = function() {
    $.gulp.task('png_gif_to_sprite', function () {
        var spriteDataGif = $.gulp.src('./source/sprite/*.png').pipe($.gp.spritesmith({
            imgName: 'spritePng.png',
            cssName: 'spritePng.css'
        }));
        var spriteDataPng = $.gulp.src('./source/sprite/*.gif').pipe($.gp.spritesmith({
            imgName: 'spriteGif.gif',
            cssName: 'spriteGif.css'
        }));
        var imgGifStream = spriteDataGif.img.pipe($.gulp.dest($.config.root + '/assets/img'));
        var imgPngStream = spriteDataPng.img.pipe($.gulp.dest($.config.root + '/assets/img'));
        var spriteDataGifStream = spriteDataGif.css.pipe($.gulp.dest($.config.root + '/assets/css'));
        var spriteDataPngStream = spriteDataPng.css.pipe($.gulp.dest($.config.root + '/assets/css'));
        var merge = require('merge-stream');
        return  merge(imgGifStream, imgPngStream, spriteDataGifStream, spriteDataPngStream);

    });
};