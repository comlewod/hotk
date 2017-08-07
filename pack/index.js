var config = require('./config');
var fs = require('fs');

console.log(config.pages);

var content = '';
config.pages.forEach(file => {
	content += fs.readFileSync(file, {encoding: 'utf8'});
});

function concatContent(file){
}
