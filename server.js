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
	console.dir(req.body);


	keen.addEvent('PullRequest', {
		'type': 'pull_request_review_comment'
	}, function(err) {
		if (err) {
			console.dir('Oh no, an error!', err);
			res.send('Oh no, an error!\n');
		} else {
			console.log('Hooray, it worked!');
			res.send('Hooray, it worked!\n');
		}
	});
})

var server = app.listen(config.listenPort, config.listenIP, function() {
	var host = server.address().address
	var port = server.address().port
	console.log('listening at http://%s:%s', host, port)
})