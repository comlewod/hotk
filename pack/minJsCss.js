var less = require('less');
var cleanCss = require('clean-css');
var uglifyJs = require('uglify-js');
var glob = require('glob');
var path = require('path');
var fs = require('fs-extra');

var config = require('./config');
var tools = require('./tools');

/*
 *	编译压缩js和css
 */
async function minJsCss(info, content, type){
	var obj = await less.render(content.css);
	var pageCss = new cleanCss().minify(obj.css).styles;
	var pageJs = uglifyJs.minify(content.js).code;

	var jsName = info.name + '-' + tools.fileRename(pageJs) + '.js';
	var cssName = info.name + '-' + tools.fileRename(pageCss) + '.css';

	if( type == 'libs' ){
		var oldJs = glob.sync(path.join(config.output, info.name + '-*.js'));
		var oldCss = glob.sync(path.join(config.output, info.name + '-*.css'));
	} else {
		var oldJs = glob.sync(path.join(config.publicPages, 'js', info.name + '-*.js'));
		var oldCss = glob.sync(path.join(config.publicPages, 'css', info.name + '-*.css'));
	}

	oldJs.forEach(_path => {
		fs.removeSync(_path);
	});
	oldCss.forEach(_path => {
		fs.removeSync(_path);
	});

	if( type == 'libs' ){
		fs.writeFileSync(path.join(config.output, jsName), pageJs, 'utf8');
		fs.writeFileSync(path.join(config.output, cssName), pageCss, 'utf8');
	} else {
		fs.writeFileSync(path.join(config.publicPages, 'js', jsName), pageJs, 'utf8');
		fs.writeFileSync(path.join(config.publicPages, 'css', cssName), pageCss, 'utf8');
	}
	
	return {
		js: jsName, 
		css: cssName
	};
}

module.exports = minJsCss;
