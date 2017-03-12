'use strict';

module.exports = {

    LOAD_TIMEOUT: 5000,

    loadImg: function loadImage(src, callbackLoaded, callbackError) {
        var uploadImage = new Image();
        var imageLoadTimeout = setTimeout(function () {
            uploadImage.src = '';
            uploadImage.onerror = null;
            uploadImage.onload = null;
            callbackError();
        }, this.LOAD_TIMEOUT);

        uploadImage.onload = function () {
            uploadImage.onerror = null;
            clearTimeout(imageLoadTimeout);
            callbackLoaded();
        };

        uploadImage.onerror = function () {
            uploadImage.onload = null;
            clearTimeout(imageLoadTimeout);
            callbackError();
        };

        uploadImage.src = src;
    },
    removeInvalidClass: function removeInvalidClass(event) {
        if (event.target.classList.contains('invalid')) event.target.classList.remove('invalid');
    },


    throttle: function throttle(callback, time) {
        var _this = this,
            _arguments = arguments;

        var state = null;
        var COOLDOWN = 1;

        return function () {
            if (state) {
                return;
            }
            callback.apply(_this, _arguments);
            state = COOLDOWN;
            setTimeout(function () {
                state = null;
            }, time);
        };
    },

    getElement: function getElement(tagName, className, textContent) {
        var element = document.createElement(tagName);
        if (className) {
            element.classList.add(className);
        }
        element.textContent = textContent;
        return element;
    }
};