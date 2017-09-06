var router = require('express').Router();
var multer = require('multer');
var ejs = require('ejs');
var upload = multer({ dest: 'uploads/'});

//var adminCrud = require('../../database/crud/admin');

router.get('/', function(req, res){
	/*
	adminCrud.query(function(result){
		res.render('index/index', {
			result: result
		});
	});
	*/
	res.render('index/index', {
		result: []
	});
});

router.post('/upload', upload.single('test'), function(req, res){
	res.json({
		'code': 0
	});
});

module.exports = router;
