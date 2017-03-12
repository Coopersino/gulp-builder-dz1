'use strict';

var SLIDER_ITEMS = 'assets/works.json';

require('./preloader/preloader')();

var load = require('./load');

var inputName = document.querySelector('.contact__name'),
    inputEmail = document.querySelector('.contact__email'),
    inputMessage = document.querySelector('.contact__message'),
    formContact = document.querySelector('.contact__form'),
    sliderContainer = document.querySelector('.slider'),
    slider = require('./slider'),
    validation = require('./validation');

formContact.addEventListener('submit', function (event) {
    event.preventDefault();
    if (validation(inputName, 'contact__name--invalid') && validation(inputEmail, 'contact__email--invalid') && validation(inputMessage, 'contact__message--invalid')) {
        event.target.submit();
    }
});

inputName.addEventListener('focus', function (event) {
    if (event.target.classList.contains('contact__name--invalid')) {
        event.target.classList.remove('contact__name--invalid');
    }
});

inputEmail.addEventListener('focus', function (event) {
    if (event.target.classList.contains('contact__email--invalid')) {
        event.target.classList.remove('contact__email--invalid');
    }
});

inputMessage.addEventListener('focus', function (event) {
    if (event.target.classList.contains('contact__message--invalid')) {
        event.target.classList.remove('contact__message--invalid');
    }
});

load(sliderContainer, SLIDER_ITEMS, function (data) {
    slider.init(data);
});