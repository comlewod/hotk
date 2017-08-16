var cryptoJs = require('crypto-js');

var tools = {
	reg: {
		widget: /\<@\s*WIDGET\s*(\w*)\s*@\>/g,
		global: /\<@\s*GLOBAL\s*(\w*)\s*@\>/g
	},

	getWidget: function(content){
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
	regLayout: function(content){
		content = content.replace(this.reg.global, function($0, $1){
			return '<% include global/' + $1 + '.html %>';
		});
		return content;
	},

	//文件名
	fileRename: function(str){
		return cryptoJs.MD5(str).toString().slice(0, 6);
	}
};
module.exports = tools;
