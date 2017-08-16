var path = require('path');
var fs = require('fs-extra');
var glob = require('glob');

var config = require('./config');
var tools = require('./tools');
var minImg = require('./minImg');
var packWidget = require('./packWidget');

/*
 *	打包global下的组件
 */
async function packGlobal(globalArr){
	for( let widget of globalArr ){
		var _path = path.join(config.globalWidget, widget);

		var widgetHtml = fs.readFileSync(path.join(_path, widget + '.html'), 'utf8');
		var imgArr = glob.sync(path.join(_path, '*', '*.+(jpeg|jpg|png|gif)'));

		var imgObj = await minImg({
			name: 'global',
			widget: widget
		}, imgArr);

		var widgetContent = packWidget(widget, {name: 'global'}, imgObj);	
	}
	return widgetContent;
}

module.exports = packGlobal;
