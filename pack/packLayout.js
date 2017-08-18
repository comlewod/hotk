'use strict'

var path = require('path');
var fs = require('fs-extra');
var glob = require('glob');

var config = require('./config');
var tools = require('./tools');
var packGlobal = require('./packGlobal');
var minJsCss = require('./minJsCss');

/*
 *	打包layout文件
 */
async function packLayout(_path, libs){
	let content = fs.readFileSync(_path, 'utf8');
	let info = path.parse(_path);
	let globalArr = [];//全局组件
	let pageJs = '';
	let pageCss = '';

	//global内的组件互相独立，不引用任何组件
	content.replace(tools.reg.global, function($0, $1){
		if( globalArr.indexOf($1) == -1 ){
			globalArr.push($1);
		}
	});
	if( globalArr.length ){
		let globalObj = await packGlobal(globalArr);
		pageJs += globalObj.js;
		pageCss += globalObj.css;
	}
	
	let staticObj = await minJsCss(info, {
		js: pageJs, 
		css: pageCss
	});

	content = tools.regLayout(content, staticObj, libs);

	fs.writeFileSync(path.join(config.templates, info.base), content, 'utf8');
	return globalArr;
}

module.exports = packLayout;
