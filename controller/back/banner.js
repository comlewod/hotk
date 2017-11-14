var router = require('express').Router();
var multer = require('multer');
var ejs = require('ejs');
var upload = multer();
var fs = require('fs-extra');

var image = require('../../service/image');


router.get('/', (req, res) => {
	res.render('back/index', {
		page: 'banner',
		result: []
	});
});

router.post('/upload', upload.array('test'), function(req, res){
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
