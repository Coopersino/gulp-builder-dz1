'use strict';

var templateElement = document.querySelector('#template-publication');
var elementToClone = void 0;

if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.public__item');
} else {
    elementToClone = templateElement.querySelector('.public__item');
}

var getElement = function getElement() {
    var element = elementToClone.cloneNode(true);
    element.publicTitle = element.querySelector('.public__title');
    element.publicDate = element.querySelector('.public__date');
    element.content = element.querySelector('.public__content');
    return element;
};

module.exports = getElement;