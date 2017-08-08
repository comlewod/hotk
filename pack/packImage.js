var imagemin = require('imagemin');
var imageminJpg = require('imagemin-jpegtran');
var glob = require('glob');
var path = require('path');
var config = require('./config');

function packImage(info){
	info.widgets.forEach(widget => {
		var jpgArr = glob.sync(path.join(config.views, info.name, widget, '*.jpg'));
		imagemin(jpgArr, path.join(config.publicPages, 'image'), {
			plugins: [
				imageminJpg()
			]
		}).then(file => {
			console.log(file);
		});
	});
}

module.exports = packImage;
