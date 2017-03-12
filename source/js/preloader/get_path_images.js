'use strict';

module.exports = function () {
    var images = [];
    var elements = document.getElementsByTagName('*');
    [].forEach.call(elements, function (item) {
        var background = getComputedStyle(item).backgroundImage;
        if (background != 'none') {
            var paths = background.split('url');
            paths = paths.filter(function (item) {
                return item.indexOf('linear-gradient') === -1 && item !== '';
            }).map(function (item) {
                return item.replace('("', '').replace('")', '').replace(', ', '');
            });
            images = images.concat(paths);
        }
        if (item.tagName === 'IMG') {
            var path = item.src;
            images.push(path);
        }
    });
    return images;
};