var path = require('path');
var fs = require('fs-extra');
var glob = require('glob');

var config = require('./config');
var tools = require('./tools');
var packGlobal = require('./packGlobal');
var minJsCss = require('./minJsCss');

async function packLayout(){
	try{
		fs.access(config.templates);
	} catch(e) {
		fs.mkdirSync(config.templates);
	}
	var oldLayout = glob.sync(path.join(config.templates, '*.html'));
	oldLayout.forEach(_path => {
		fs.removeSync(_path);
	});
	for( let _path of config.layouts ){
		var content = fs.readFileSync(_path, 'utf8');
		var info = path.parse(_path);
		var globalArr = [];//全局组件
		var pageJs = '';
		var pageCss = '';

		//global内的组件互相独立，不引用任何组件
		content.replace(tools.reg.global, function($0, $1){
			if( globalArr.indexOf($1) == -1 ){
				globalArr.push($1);
			}
		});
		if( globalArr.length ){
			var globalObj = await packGlobal(globalArr);
		}
		pageJs += globalObj.js;
		pageCss += globalObj.css;

		minJsCss(info, {
			js: pageJs, 
			css: pageCss
		});

		content = tools.regLayout(content);

		fs.writeFileSync(path.join(config.templates, info.base), content, 'utf8');
	}
}

module.exports = packLayout;
