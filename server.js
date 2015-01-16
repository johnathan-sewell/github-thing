var config = require('./config');
var express = require('express');

var express = require('express')
var app = express()

function log(req){
  console.log('%s request handeled for %s', req.method, req.url);
}
app.get('/', function(req, res) {
	log(req);
	res.send('Hello, please POST to /comment.\n');
})

app.post('/comment', function(req, res) {
	console.dir(req.body);	
	res.send('Recieved your comment.\n');
})

var server = app.listen(config.listenPort, config.listenIP, function() {
	var host = server.address().address
	var port = server.address().port
	console.log('listening at http://%s:%s', host, port)
})