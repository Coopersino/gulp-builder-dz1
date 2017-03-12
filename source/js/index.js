'use strict';

require('./preloader/preloader')();

var inputLogin = document.querySelector('.authoriz__login'),
    inputPassword = document.querySelector('.authoriz__password'),
    formLogin = document.querySelector('.authoriz__form'),
    validation = require('./validation');

formLogin.addEventListener('submit', function (event) {
    event.preventDefault();
    if (validation(inputLogin, 'authoriz__login--invalid') && validation(inputPassword, 'authoriz__password--invalid')) {
        event.target.submit();
    }
});

inputLogin.addEventListener('focus', function (event) {
    if (event.target.classList.contains('authoriz__login--invalid')) {
        event.target.classList.remove('authoriz__login--invalid');
    }
});

inputPassword.addEventListener('focus', function (event) {
    if (event.target.classList.contains('authoriz__login--invalid')) {
        event.target.classList.remove('authoriz__login--invalid');
    }
});