var router = require('express').Router();
var multer = require('multer');
var ejs = require('ejs');
var upload = multer();
var fs = require('fs-extra');

var image = require('../../service/image');
var adminCrud = require('../../database/crud/admin');

router.get('/', (req, res) => {
	//res.locals.IMG_PATH = 'hhaha';
	res.send(res.locals);return;
	adminCrud.query('banner', (result) => {
		res.render('back/index', {
			page: 'banner',
			result: result
		});
	});

	/*
	
	*/
});

router.post('/upload', upload.single('banner'), (req, res) => {
	let file = req.file;

	let imgPath = image.save('banner', file);
	let obj = Object.assign({image: imgPath}, req.body);

	adminCrud.insert('banner', obj, (result) => {
		res.json({
			'code': 0,
			'msg': 'save image success'
		});
	});
	
	/*
	for( let file of req.files ){
		image.save('banner', file);
	}
	
	res.json({
		'code': 0
	});
	*/
});

module.exports = router;
