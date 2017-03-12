'use strict';

var blocks = require('./bloks');

var setPercents = require('./set_percents');

var utilities = require('../utilities');

var getPathImages = require('./get_path_images');

module.exports = function () {
    blocks.preloader.classList.remove('preloader--hidden');

    var percentsTotal = 0;
    var images = getPathImages();

    images.forEach(function (item) {
        utilities.loadImg(item, function () {
            percentsTotal++;
            setPercents(images.length, percentsTotal);
        }, function () {
            percentsTotal++;
            setPercents(images.length, percentsTotal);
        });
    });
};