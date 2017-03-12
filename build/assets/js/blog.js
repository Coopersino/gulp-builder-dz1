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

	module.exports = __webpack_require__(10);


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
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BLOG_PUBLICATIONS = 'assets/blog.json';

	__webpack_require__(2)();

	var blog = __webpack_require__(11);

	var load = __webpack_require__(7);

	load(document.body, BLOG_PUBLICATIONS, function (data) {
	    blog.init(data);
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

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

	var utilities = __webpack_require__(5);
	var getNavigation = __webpack_require__(12);
	var fillNavigation = __webpack_require__(13);
	var getPublication = __webpack_require__(14);
	var fillPublication = __webpack_require__(15);
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

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	var templateElement = document.querySelector('#template-navigation');
	var elementToClone = void 0;

	if ('content' in templateElement) {
	    elementToClone = templateElement.content.querySelector('.public__nav-item');
	} else {
	    elementToClone = templateElement.querySelector('.public__nav-item');
	}

	var getElement = function getElement() {
	    var element = elementToClone.cloneNode(true);
	    element.navItem = element.querySelector('a');
	    return element;
	};

	module.exports = getElement;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	var fill = function fill(element, data) {
	    element.navItem.textContent = data.title;
	    element.navItem.href = '#' + data.id;
	};

	module.exports = fill;

/***/ },
/* 14 */
/***/ function(module, exports) {

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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utilities = __webpack_require__(5);
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

/***/ }
/******/ ]);