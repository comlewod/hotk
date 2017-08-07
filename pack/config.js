var glob = require('glob');
var path = require('path');

var ROOT = process.cwd();
var config = {
	root: ROOT,
	views: path.join(ROOT, 'views')
};

config.pages = glob.sync(path.join(config.views, '*', '*.html'));
module.exports = config;
