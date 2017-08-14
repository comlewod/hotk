var cryptoJs = require('crypto-js');

var tools = {
	reg: {
		widget: /\<@\s*widget\((\w*)\)\s*@\>/g
	},

	getWidget: function(content){
	},
	//模板中组件引用替换 ex: <{ widget(page) }>改成<% include page.html %>
	widgetReg: function(content){
		var reg = /\<%\s*widget\((\w*)\)\s*%\>/g; 
		content = content.replace(reg, function($0, $1){
			return '<% include ' + $1 + '.html %>';
		});
		return content;
	},

	//文件名
	fileRename: function(str){
		if( str )
		return cryptoJs.MD5(str).toString().slice(0, 5);
	}
};
module.exports = tools;
