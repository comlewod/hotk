var router = require('express').Router();
var multer = require('multer');
var ejs = require('ejs');
var upload = multer();
var fs = require('fs-extra');

var image = require('../../service/image');

//如果用户没登录，则跳转登录页
/*
router.use(/(?!\/login)/, (req, res, next) => {
	if( !req.session.user ){
		return res.redirect('/back/login');
	}
	next();
});
*/

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
