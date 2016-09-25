var exec = require('child_process').exec;
var fs = require('fs');

const build_cmd = 'ls';

// Log File
const logfile = 'build_report.log';

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