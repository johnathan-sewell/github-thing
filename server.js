var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');

var express = require('express')
var app = express()
app.use(bodyParser.json())

function log(req){
  console.log('%s request handled for %s', req.method, req.url);
}

app.get('/', function(req, res) {
	log(req);
	res.send('Hello, please POST to /comment.\n');
})

app.post('/comment', function(req, res) {
	log(req);
	console.dir(req.body);	
	res.send('Recieved your comment.\n');
})

var server = app.listen(config.listenPort, config.listenIP, function() {
	var host = server.address().address
	var port = server.address().port
	console.log('listening at http://%s:%s', host, port)
})