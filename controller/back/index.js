var router = require('express').Router();
var multer = require('multer');
var ejs = require('ejs');
var upload = multer();
var fs = require('fs-extra');

var image = require('../../service/image');

router.get('/', (req, res) => {
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
router.use('/login', require('./login'));

module.exports = router;
