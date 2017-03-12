'use strict';

var templateElement = document.querySelector('#template-navigation');
var elementToClone = void 0;

if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.public__nav-item');
} else {
    elementToClone = templateElement.querySelector('.public__nav-item');
}

var getElement = function getElement() {
    var element = elementToClone.cloneNode(true);
    element.navItem = element.querySelector('a');
    return element;
};

module.exports = getElement;