// Imports
var express = require('express');

// Globals
const port = 8000;
var app = express();

// Server
app.listen(port, function(){
    console.log("Server running on: http://127.0.0.0:"+port);
});

// Route Requests
app.get('/', function(req, res){
    console.log('History!');
    res.send('History');
});

app.get('/build', function(req, res){
    console.log('Build!');
    res.send('Build');
});