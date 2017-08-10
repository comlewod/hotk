var path = require('path');
var fs = require('fs-extra');
var glob = require('glob');

var config = require('./config');

function packLayout(){
	var oldLayout = glob.sync(path.join(config.views, '*.html'));
	oldLayout.forEach(_path => {
		fs.removeSync(_path);
	});
	config.layouts.forEach(_path => {
		var content = fs.readFileSync(_path, 'utf8');
		var info = path.parse(_path);
		fs.writeFileSync(path.join(config.views, info.base), content, 'utf8');
	});
}

module.exports = packLayout;
