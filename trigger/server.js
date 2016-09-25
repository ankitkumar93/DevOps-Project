// Imports
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

// Controllers
var build = require('./controller/build.js');
var history = require('./controller/history.js');

// Globals
const port = 8000;
const db_name='build_devops';

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

app.get('/api/history', function(req, res){
    history.getHistory(res);
});