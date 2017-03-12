'use strict';

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var utilities = require('../utilities');
var getNavigation = require('./nav/get');
var fillNavigation = require('./nav/fill');
var getPublication = require('./public/get');
var fillPublication = require('./public/fill');
var THROTTLE_DELAY = 100;
var Blog = function () {
    function Blog() {
        _classCallCheck(this, Blog);
        this.wrapper = document.querySelector('.wrapper');
        this.header = document.querySelector('.page-header--blog');
        this.publication = {
            container: document.querySelector('.public__items'),
            items: []
        };
        this.navigation = {
            container: document.querySelector('.public__nav'),
            list: document.querySelector('.public__nav-items'),
            button: document.querySelector('.public__nav-btn'),
            items: []
        };
    }
    _createClass(Blog, [{
        key: 'init',
        value: function init(data) {
            this.data = data;
            this.render();
            this.toAddActiveNavigation();
            this.toFixButtonNavigation();
            this.navigation.button.addEventListener('click', this.onClick.bind(this));
            window.addEventListener('scroll', utilities.throttle(this.onScroll.bind(this), THROTTLE_DELAY));
            window.addEventListener('scroll', this.toFixButtonNavigation.bind(this));
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;
            this.data.forEach(function (item, index) {
                var publication = getPublication();
                fillPublication(publication, item);
                _this.publication.items.push(publication);
                _this.publication.container.appendChild(publication);
                var nav = getNavigation();
                fillNavigation(nav, item);
                if (index === 0) {
                    nav.classList.add('public__nav-item--active');
                }
                _this.navigation.items.push(nav);
                _this.navigation.list.appendChild(nav);
            });
        }
    }, {
        key: 'onScroll',
        value: function onScroll() {
            this.toAddActiveNavigation();
            this.toFixNavigation();
        }
    }, {
        key: 'toFixNavigation',
        value: function toFixNavigation() {
            if (this.navigation.container.getBoundingClientRect().top <= 50) {
                this.navigation.list.classList.add('public__nav-items--fixed');
            } else {
                this.navigation.list.classList.remove('public__nav-items--fixed');
            }
        }
    }, {
        key: 'toFixButtonNavigation',
        value: function toFixButtonNavigation() {
            var headerTop = this.header.getBoundingClientRect().bottom;
            var buttonTop = this.navigation.button.getBoundingClientRect().top;
            if (buttonTop < headerTop) {
                this.navigation.button.style.top = headerTop + 'px';
            } else if (buttonTop > headerTop && buttonTop >= document.documentElement.clientHeight / 2) {
                this.navigation.button.style.top = '50%';
            }
        }
    }, {
        key: 'toAddActiveNavigation',
        value: function toAddActiveNavigation() {
            var _this2 = this;

            this.publication.items.forEach(function (item, index) {
                if (item.getBoundingClientRect().top < document.documentElement.clientHeight / 2) {
                    var activeItem = document.querySelector('.public__nav-item--active');
                    if (activeItem) activeItem.classList.remove('public__nav-item--active');
                    _this2.navigation.items[index].classList.add('public__nav-item--active');
                }
            });
        }
    }, {
        key: 'onClick',
        value: function onClick() {
            this.wrapper.classList.toggle('shifted');
        }
    }]);

    return Blog;
}();

module.exports = new Blog();