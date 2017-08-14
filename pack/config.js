var glob = require('glob');
var path = require('path');
var widgets = require('../views/widgets.json');

var ROOT = process.cwd();
var config = {
	root: ROOT,
	views: path.join(ROOT, 'views'),
	templates: path.join(ROOT, 'templates'),
	publicPages: path.join(ROOT, 'public', 'pages'),
	widgets: widgets
};

config.pagesIndex = glob.sync(path.join(config.views, '*', '*.html'));
config.layouts = glob.sync(path.join(config.views, '*.html'));

module.exports = config;
