'use strict';

var blocks = require('./bloks');

module.exports = function (total, correct) {
    var percent = Math.ceil(correct / total * 100);

    if (percent >= 100) {
        blocks.preloader.classList.add('preloader--hidden');
    }

    blocks.preloaderPercent.textContent = percent;
};