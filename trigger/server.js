// Imports
var express = require('express');
var mongoose = require('mongoose');

// Controllers
var build = require('./controller/build.js');
var history = require('./controller/history.js');

// Globals
const port = 8000;
const db_name='build_devops';

// Setup Express
var app = express();
app.use(express.static(__dirname + '/public'));

// Connect to DB
mongoose.connect('mongodb://localhost/' + db_name);

// Server
app.listen(port, function(){
    console.log("Server running on: http://127.0.0.0:"+port);
});

// Route Requests
app.get('/', function(req, res){
    history.getHistory(req, res);
});

app.get('/build', function(req, res){
    build(res);
});