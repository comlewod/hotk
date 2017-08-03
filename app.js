var express = require('express');
var mysql = require('mysql');
var db = require('./conf/db');
var os = require('os');

var app = new express();

//创建连接池，提高性能
var pool = mysql.createPool(db.mysql);

app.get('/', function(req, res){
	pool.getConnection(function(err, connection){
		connection.query('SELECT * FROM user', function(err, results, fields){
			if( err ) throw err;
			res.json(results);
		});
	});
	//res.send('Hello, Athena');
});

module.exports = app;
