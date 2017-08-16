var glob = require('glob');
var path = require('path');
var fs = require('fs-extra');
var cryptoJs = require('crypto-js');

var config = require('./config');
var packWidget = require('./packWidget');
var packPage = require('./packPage');
var tools = require('./tools');
var minImg = require('./minImg');

var packGlobal = require('./packGlobal');

async function packImage(info){
	//该页面的js和css
	var pageJs = '';
	var pageCss = '';

	//删除旧的图片
	var oldArr = glob.sync(path.join(config.publicPages, 'image', info.name + '*.+(jpeg|jpg|png|gif)'));
	oldArr.forEach(_path => {
		fs.removeSync(_path);
	});
	
	//page的图片，可共用到当前页面的其它组件（图片同名则以组件图片优先）
	var pageImg = {};
	var globalArr = [];//全局组件
	for( let widget of info.widgets ){
		var widgetPath = path.join(config.views, info.name, widget);
		//处理组件内的图片，并替换组件内js、css的图片名称
		var imgObj = await minImg({
			name: info.name,
			widget: widget
		}, glob.sync(path.join(widgetPath, '*', '*.+(jpeg|jpg|png|gif)')));

		if( widget == 'page' ){
			pageImg = JSON.parse(JSON.stringify(imgObj));
		} else {
			Object.assign(imgObj, pageImg);
		}
		var widgetContent = packWidget(widget, info, imgObj);	
		pageJs += widgetContent.js;
		pageCss += widgetContent.css;

		var widgetHtml = fs.readFileSync(path.join(widgetPath, widget + '.html'), 'utf8');
		//是否有引用全局组件
		widgetHtml.replace(tools.reg.global, function($0, $1){
			if( globalArr.indexOf($1) == -1 ){
				globalArr.push($1);
			}
		});
	}

	if( globalArr.length ){
		var globalObj = await packGlobal(globalArr);
		pageJs += globalObj.js;
		pageCss += globalObj.css;
	}

	packPage(info, {
		js: pageJs,			//页面的所有组件js
		css: pageCss,		//页面的所有组件css
		pageImg: pageImg	//page组件的图片，可共用于其它组件
	});
}

module.exports = packImage;
