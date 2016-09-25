var exec = require('child_process').exec;
var dateformat = require('dateformat');
var history = require('./history.js');

const build_cmd = 'ls';

// Pre Build Function
function preBuild() {
    console.log("BUILD: Initializing");
}

// Build Function
function onBuild(res) {

    // Pre Build
    preBuild();

    // Build
    var build_process = exec(build_cmd, {maxBuffer: 1024 * 5000}, postBuild);

    // Bind Streams
    build_process.stdout.pipe(res);
    build_process.stderr.pipe(process.stderr);
}

// Post Build Callback
function postBuild(err, stdout, stderr) {
    if (err){
        console.log(err);
    }

    var now = new Date();
    var timestamp = dateformat(now);
    var status = 'Success';
    var log = stdout;

    history.addBuild(timestamp, log, status, 'develop', function(err){
        if (err)
            console.log(err);
        else
            console.log("BUILD: Completed - " + timestamp);
            console.log("BUILD: Status - " + status);
    });
}

module.exports = onBuild;