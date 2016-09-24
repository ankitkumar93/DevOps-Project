// Imports
var http = require('http');
var exec = require('child_process').exec;
var fs = require('fs');

// Globals
const port = 8000;
const build_cmd = 'ls';

// Log File
const logfile = 'build_report.log';

// Server
var server = http.createServer(onRequest);
server.listen(port, function(){
    console.log("Server running on: http://127.0.0.0:"+port);
});

// Request Callback
function onRequest(req, res) {
    console.log("Starting Build...");

    // Build
    var build_process = exec(build_cmd, {maxBuffer: 1024 * 5000}, onBuild);

    // Bind Streams
    build_process.stdout.pipe(res);
    build_process.stderr.pipe(process.stderr);

    build_process.on('exit', function(){
        console.log('Build Completed');
        return true;
    });
}

// Build Callback
function onBuild(err, stdout, stderr) {
    if (err){
        console.log(err);
    }

    fs.writeFileSync(logfile, stdout);
}