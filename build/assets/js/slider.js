/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);


/***/ },

/***/ 5:
/***/ function(module, exports) {

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

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor;
	    };
	}();

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function");
	    }
	}

	var utilities = __webpack_require__(5);

	var Slider = function () {
	    function Slider() {
	        _classCallCheck(this, Slider);

	        this.currentSlide = 0;
	        this.elements = {

	            desc: {

	                title: document.querySelector('.title--slider'),

	                techno: document.querySelector('.slider__techno')
	            },

	            img: document.querySelector('.slider__img'),

	            controls: {

	                prev: document.querySelector('.slider__control--prev'),
	                next: document.querySelector('.slider__control--next')
	            }
	        };
	    }

	    _createClass(Slider, [{
	        key: 'init',

	        value: function init(data) {
	            // Сохраняем данные с сервера
	            this.works = data;
	            // Отрисовываем слайдер
	            this.renderSlide();
	            // Обработчик клика по кнопке "следующий слайд"
	            this.elements.controls.prev.addEventListener('click', this.showPrev.bind(this));
	            // Обработчик клика по кнопке "предыдущий слайд"
	            this.elements.controls.next.addEventListener('click', this.showNext.bind(this));
	        }
	    }, {
	        key: 'renderSlide',
	        value: function renderSlide() {
	            this.renderTitle(this.works[this.currentSlide].title);
	            this.renderDesc(this.works[this.currentSlide].techno);
	            this.renderImgBlock();
	            this.renderControl(this.elements.controls.next, 'current', this.works[this.nextSlide].img);
	            this.renderControl(this.elements.controls.prev, 'current', this.works[this.prevSlide].img);
	        }
	    }, {
	        key: 'renderDesc',
	        value: function renderDesc(data) {
	            var _this = this;

	            data.forEach(function (item) {
	                var technoItem = utilities.getElement('li', 'slider__techno-item', item);
	                _this.elements.desc.techno.appendChild(technoItem);
	            });
	        }
	    }, {
	        key: 'renderTitle',
	        value: function renderTitle(data) {
	            var _this2 = this;
	            var words = data.split(' ');
	            var counter = 0;
	            words.forEach(function (item) {
	                var word = utilities.getElement('div', false, '');
	                for (var i = 0; i < item.length; i++) {
	                    counter++;
	                    var char = utilities.getElement('span', 'slider__char', item[i]);
	                    char.style.cssText += 'animation-delay: ' + counter * 0.01 + 's';
	                    word.appendChild(char);
	                }
	                _this2.elements.desc.title.appendChild(word);
	            });
	        }
	    }, {
	        key: 'getImg',
	        value: function getImg(url) {
	            var img = new Image();
	            utilities.loadImg(url, function () {
	                img.src = url;
	            }, function () {
	                img.classList.add('slider__img--error');
	            });
	            return img;
	        }
	    }, {
	        key: 'renderImgBlock',
	        value: function renderImgBlock() {
	            var img = this.getImg(this.works[this.currentSlide].img);
	            this.elements.img.appendChild(img);
	        }
	    }, {
	        key: 'renderControl',
	        value: function renderControl(container, modifier, url) {
	            var img = this.getImg(url);
	            var classModifier = 'slider__control-img--' + modifier;
	            var div = utilities.getElement('div', 'slider__control-img', '');
	            div.classList.add(classModifier);
	            div.appendChild(img);
	            container.appendChild(div);
	        }
	    }, {
	        key: 'showNext',
	        value: function showNext() {
	            this.clearSlider();
	            this.renderControl(this.elements.controls.next, 'secondary', this.works[this.nextSlide].img);
	            this.renderControl(this.elements.controls.prev, 'secondary', this.works[this.prevSlide].img);
	            this.currentSlide = this.nextSlide;
	            this.renderSlide();
	        }
	    }, {
	        key: 'showPrev',
	        value: function showPrev() {
	            this.clearSlider();
	            this.renderControl(this.elements.controls.next, 'secondary', this.works[this.nextSlide].img);
	            this.renderControl(this.elements.controls.prev, 'secondary', this.works[this.prevSlide].img);
	            this.currentSlide = this.prevSlide;
	            this.renderSlide();
	        }
	    }, {
	        key: 'clearSlider',
	        value: function clearSlider() {
	            this.elements.desc.title.innerHTML = '';
	            this.elements.desc.techno.innerHTML = '';
	            this.elements.img.innerHTML = '';
	            this.elements.controls.next.innerHTML = '';
	            this.elements.controls.prev.innerHTML = '';
	        }
	    }, {
	        key: 'nextSlide',
	        get: function get() {
	            if (this.currentSlide + 1 > this.works.length - 1) {
	                return 0;
	            } else {
	                return this.currentSlide + 1;
	            }
	        }
	    }, {
	        key: 'prevSlide',
	        get: function get() {
	            if (this.currentSlide - 1 < 0) {
	                return this.works.length - 1;
	            } else {
	                return this.currentSlide - 1;
	            }
	        }
	    }]);

	    return Slider;
	}();

	module.exports = new Slider();

/***/ }

/******/ });