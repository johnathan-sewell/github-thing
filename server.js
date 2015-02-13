var config = require('./config'),
	express = require('express'),
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

var server = app.listen(config.listenPort, config.listenIP, function() {
	var host = server.address().address,
		port = server.address().port;
	console.log('listening at http://%s:%s', host, port);
})