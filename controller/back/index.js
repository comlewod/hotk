var router = require('express').Router();
var multer = require('multer');
var ejs = require('ejs');
var upload = multer();
var fs = require('fs-extra');

var image = require('../../service/image');

//var adminCrud = require('../../database/crud/admin');

router.get('/', (req, res) => {
	/*
	adminCrud.query(function(result){
		res.render('index/index', {
			result: result
		});
	});
	*/
	res.render('back/index', {
		page: '',
		result: []
	});
});

/*
router.get('/:page', function(req, res){
	let {page} = req.params;
	res.render('back/index', {
		page: page,
		result: []
	});
});
*/

router.use('/banner', require('./banner'));

module.exports = router;
