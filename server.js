var config = require('./config');
var http = require('http');

http.createServer(function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.end('Hello, I\'m a tiny little HTTP thing.\n');
}).listen(1337, config.listenIP);

console.log('Server running at http://' + config.listenIP + ':1337/');