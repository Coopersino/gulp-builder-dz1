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

	module.exports = __webpack_require__(16);


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
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2)();

	var inputLogin = document.querySelector('.authoriz__login'),
	    inputPassword = document.querySelector('.authoriz__password'),
	    formLogin = document.querySelector('.authoriz__form'),
	    validation = __webpack_require__(17);

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

/***/ },
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

/***/ }
/******/ ]);