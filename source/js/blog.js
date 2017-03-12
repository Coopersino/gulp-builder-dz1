'use strict';

var BLOG_PUBLICATIONS = 'assets/blog.json';

require('./preloader/preloader')();

var blog = require('./blog/blog_constructor');

var load = require('./load');

load(document.body, BLOG_PUBLICATIONS, function (data) {
    blog.init(data);
});