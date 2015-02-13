var fs = require('fs'),
	config = require('./config'),
	express = require('express'),
	https = require('https'),
	bodyParser = require('body-parser'),
	Keen = require('keen.io'),
	morgan = require('morgan'),
	app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));


var keen = Keen.configure({
	projectId: config.keen.projectId,
	writeKey: config.keen.writeKey
});

var httpsServer = https.createServer({
	key: fs.readFileSync('sslcert/key.pem', 'utf8'),
	cert: fs.readFileSync('sslcert/cert.pem', 'utf8')
}, app);

httpsServer.listen(config.listenPort, config.listenIP, function() {
	var host = httpsServer.address().address,
		port = httpsServer.address().port;
	console.log('listening at https://%s:%s', host, port);
});

app.get('/', function(req, res) {
	res.send('Hello, please POST to /comment.\n');
})

app.post('/comment', function(req, res) {
	keen.addEvent('PullRequest', {
		'type': 'review_comment'
	}, function(err) {
		if (err) {
			res.send('Oh no, an error occured!\n');
		} else {
			res.send('OK!\n');
		}
	});
})