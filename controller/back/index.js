var router = require('express').Router();
var multer = require('multer');
var ejs = require('ejs');
var upload = multer();
var fs = require('fs-extra');

var image = require('../../service/image');

//如果用户没登录，则跳转登录页
router.use(/^(?!\/login)/, (req, res, next) => {
	if( !req.session.user ){
		return res.redirect('/back/login');
	}
	next();//需要继续往下执行中间件，无论是否重定向后的路由，都需要有个能匹配到的链接
});

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

const routers = ['login', 'banner'];
routers.forEach(route => router.use(`/${route}`, require(`./${route}`)));

module.exports = router;
