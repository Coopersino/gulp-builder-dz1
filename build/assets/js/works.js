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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var blocks = __webpack_require__(3);

	var setPercents = __webpack_require__(4);

	var utilities = __webpack_require__(5);

	var getPathImages = __webpack_require__(6);

	module.exports = function () {
	    blocks.preloader.classList.remove('preloader--hidden');

	    var percentsTotal = 0;
	    var images = getPathImages();

	    images.forEach(function (item) {
	        utilities.loadImg(item, function () {
	            percentsTotal++;
	            setPercents(images.length, percentsTotal);
	        }, function () {
	            percentsTotal++;
	            setPercents(images.length, percentsTotal);
	        });
	    });
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    preloader: document.querySelector('.preloader'),
	    preloaderPercent: document.querySelector('.wave text')
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var blocks = __webpack_require__(3);

	module.exports = function (total, correct) {
	    var percent = Math.ceil(correct / total * 100);

	    if (percent >= 100) {
	        blocks.preloader.classList.add('preloader--hidden');
	    }

	    blocks.preloaderPercent.textContent = percent;
	};

/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	    var images = [];
	    var elements = document.getElementsByTagName('*');
	    [].forEach.call(elements, function (item) {
	        var background = getComputedStyle(item).backgroundImage;
	        if (background != 'none') {
	            var paths = background.split('url');
	            paths = paths.filter(function (item) {
	                return item.indexOf('linear-gradient') === -1 && item !== '';
	            }).map(function (item) {
	                return item.replace('("', '').replace('")', '').replace(', ', '');
	            });
	            images = images.concat(paths);
	        }
	        if (item.tagName === 'IMG') {
	            var path = item.src;
	            images.push(path);
	        }
	    });
	    return images;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

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

/***/ },
/* 8 */,
/* 9 */
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

/***/ },
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (inputNode, classError) {
	    if (inputNode.value === '') {
	        inputNode.classList.add(classError);
	        return false;
	    } else {
	        return true;
	    }
	};

/***/ },
/* 18 */,
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var SLIDER_ITEMS = 'assets/works.json';

	__webpack_require__(2)();

	var load = __webpack_require__(7);

	var inputName = document.querySelector('.contact__name'),
	    inputEmail = document.querySelector('.contact__email'),
	    inputMessage = document.querySelector('.contact__message'),
	    formContact = document.querySelector('.contact__form'),
	    sliderContainer = document.querySelector('.slider'),
	    slider = __webpack_require__(9),
	    validation = __webpack_require__(17);

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

/***/ }
/******/ ]);