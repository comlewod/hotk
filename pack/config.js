var glob = require('glob');
var path = require('path');

var ROOT = process.cwd();
var config = {
	root: ROOT,
	pages: path.join(ROOT, 'pages'),
	views: path.join(ROOT, 'views'),
	publicPages: path.join(ROOT, 'public', 'pages')
};

config.pagesIndex = glob.sync(path.join(config.pages, '*', '*.html'));
config.layouts = glob.sync(path.join(config.pages, '*.html'));

module.exports = config;
