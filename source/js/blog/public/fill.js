'use strict';

var utilities = require('../../utilities');
var fill = function fill(element, data) {
    element.setAttribute('id', data.id);
    element.publicTitle.textContent = data.title;
    element.publicDate.textContent = data.date;
    data.content.forEach(function (item) {
        var paragraph = utilities.getElement('p', false, item);
        element.content.appendChild(paragraph);
    });
};

module.exports = fill;