var cryptoJs = require('crypto-js');
var path = require('path');
var fs = require('fs');

var config = require('./config');

var tools = {
	reg: {
		widget: /\<@\s*WIDGET\s*(\w*)\s*@\>/g,
		global: /\<@\s*GLOBAL\s*(\w*)\s*@\>/g
	},
	
	//模板中组件引用替换 ex: <{ widget(page) }>改成<% include page.html %>
	regReplace: function(content){
		content = content.replace(this.reg.widget, function($0, $1){
			return '<% include ' + $1 + '.html %>';
		});

		content = content.replace(this.reg.global, function($0, $1){
			return '<% include ../global/' + $1 + '.html %>';
		});
		return content;
	},
	regLayout: function(content, staticObj){
		content = content.replace(this.reg.global, function($0, $1){
			return '<% include global/' + $1 + '.html %>';
		});
		content = content.replace(/layout.js/, function(){
			return '/pages/js/' + staticObj.js;
		});
		content = content.replace(/layout.css/, function(){
			return '/pages/js/' + staticObj.css;
		});
		return content;
	},

	//文件名
	fileRename: function(str){
		return cryptoJs.MD5(str).toString().slice(0, 6);
	},

	//获取页面组件等信息
	pageInfo: function(filePath){
		var arr = filePath.split('/').reverse();
		var pagePath = path.join(config.views, arr[1], '*', '*.html');

		var info = path.parse(filePath);

		var reg = tools.reg.widget;
		var content = fs.readFileSync(filePath, 'utf8');
		var widgets = [];
		content.replace(reg, function($0, $1){
			if( widgets.indexOf($1) == -1 ){
				widgets.push($1);
			}
		});
		var pageIndex = widgets.indexOf('page');
		if( pageIndex > -1 ){
			widgets.splice(pageIndex, 1);
			//把page组件放到最前，优先打包处理
			widgets.unshift('page');
		}
		tools.getWidget(info, widgets, widgets);
		
		return {
			name: arr[1],		//页面名称
			file: arr[0],		//页面入口文件
			path: filePath,		//页面入口路径
			widgets: widgets	//页面所含有的组件名称
		};
	},

	//递归获取页面的所有组件依赖
	getWidget: function(info, n_widgets, widgets){
		var reg = tools.reg.widget;
		var globalReg = tools.reg.globalWidget;
		var new_widgets = [];	
		n_widgets.forEach(widget => {
			var _path = path.join(info.dir, widget, widget + '.html');
			var content = fs.readFileSync(_path, 'utf8');

			content.replace(reg, function($0, $1){
				if( widgets.indexOf($1) == -1 ){
					new_widgets.push($1);
					widgets.push($1);
				}
			});
		});
		if( new_widgets.length ){
			tools.getWidget(info, new_widgets, widgets);
		}
	}
};
module.exports = tools;
