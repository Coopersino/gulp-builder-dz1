'use strict';

var fill = function fill(element, data) {
    element.navItem.textContent = data.title;
    element.navItem.href = '#' + data.id;
};

module.exports = fill;