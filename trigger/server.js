// Imports
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

// Controllers
var build = require('./controller/build.js');
var alert = require('./controller/alert.js');
var feature = require('./controller/feature.js');
var deploy = require('./controller/deploy.js');
var canary = require('./controller/canary.js');
var scale = require('./controller/scale.js');
var killcanary = require('./controller/killcanary.js');
var history = require('./controller/history.js');

// Globals
const port = 8000;
const db_name='devops';

// Setup Express
var app = express();
app.use(express.static(path.join(__dirname, 'static')));

// Connect to DB
mongoose.connect('mongodb://localhost/' + db_name);

// Server
app.listen(port, function(){
    console.log("Server running on: http://127.0.0.0:"+port);
});

// Route Requests
// Views
app.get('/', function(req, res){
    res.sendFile('history.html', {root: path.join(__dirname, 'views')});
});

app.get('/log', function(req, res){
    res.sendFile('log.html', {root: path.join(__dirname, 'views')});
});

app.get('/build', function(req, res){
    build(req, res);
});

// APIs
app.get('/api/log/:id', function(req, res){
    history.getLog(req.params.id, res);
});

app.get('/api/recent', function(req, res){
    history.getRecentLogID(res);
});

app.get('/api/history', function(req, res){
    history.getHistory(res);
});

app.get('/deploy', function(req, res){
    deploy(res);
});

app.get('/canary', function(req, res){
    canary(res);
});

app.get('/killcanary', function(req, res){
    killcanary(res);
});

app.get('/scale', function(req, res){
    scale(res);
});

app.get('/alert/:st', function(req, res){
    alert(req.params.st, res);
});

app.get('/feature/:ip', function(req, res){
    feature(req.params.ip, res);
});