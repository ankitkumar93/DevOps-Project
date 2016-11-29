var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var serviceProvider = require('./service_provider.js');
app.use(bodyParser.urlencoded({
	  extended: true
	}));//to be able to send form data that's url encoded in the body of Post requests
app.use(bodyParser.json()); // for parsing application/json

app.get('/', function (req, res) {
  res.send('Hi There, Welcome to Demo of Watson Conversation services');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.post('/conversation',serviceProvider.query);
