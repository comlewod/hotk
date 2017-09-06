var path = require('path');
var express = require('express');
var mysql = require('mysql');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var controller = require('./controller/init');
var os = require('os');

var app = new express();

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'html');
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(controller);//通过express的router来获取所设置的路由

module.exports = app;
