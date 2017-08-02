var express = require('express');

var app = new express();

app.get('/', function(req, res){
	res.send('Hello, Athena');
});

app.listen(3000);
