'use strict';

var LOAD_TIMEOUT = 10000;

var toFailedLoadXHR = function toFailedLoadXHR(container) {
    container.classList.remove('loading');
    container.classList.add('error');
};

var load = function load(container, url, callback) {
    container.classList.add('loading');
    var xhr = new XMLHttpRequest();
    var xhrLoadTimeout = setTimeout(function () {
        toFailedLoadXHR(container);
    }, LOAD_TIMEOUT);

    xhr.onload = function (event) {
        xhr.onerror = null;
        var loadedData = JSON.parse(event.target.response);
        callback(loadedData);
    };

    xhr.onloadend = function () {
        clearTimeout(xhrLoadTimeout);
        container.classList.remove('loading');
    };

    xhr.onerror = function () {
        xhr.onload = null;
        toFailedLoadXHR(container);
    };

    xhr.open('GET', url);
    xhr.send();
};

module.exports = load;