var exec = require('child_process').exec;
var dateformat = require('dateformat');
var history = require('./history.js');
var parse = require('./parser.js');
var mailer = require('./mailer.js');

const build_cmd = 'sudo docker run -v /home/ubuntu/DevOps-Project/build/:/vol buildserver sh -c /vol/build.sh';

// Pre Build Function
function preBuild(){
    console.log("BUILD: Initializing");
}

// Build Function
function onBuild(req, res) {

    var branch = req.query.branch;

    // Build
    if (typeof branch == 'undefined') {
        res.send("Error: Please send a proper GET request!")
    }else{
        preBuild();
        var build_process = exec(build_cmd, {maxBuffer: 1024 * 5000}, function(err, stdout, stderr){
            postBuild(err, stdout, branch, res);
        });
    }
}

// Post Build Callback
function postBuild(err, stdout, branch) {
    if (err){
        console.log(err);
    }

    var now = new Date();
    var id = now.getTime();
    var timestamp = dateformat(now);
    var log = stdout;
    var status = parse(log);
    var response = {"status": status};

    history.addBuild(id, timestamp, log, status, branch, function(err){
        if (err)
            console.log(err);
        else{
            console.log("BUILD: Branch - " + branch);
            console.log("BUILD: Completed - " + timestamp);
            console.log("BUILD: Status - " + status);
            mailer(status, branch, id);
            res.send(response);
        }
    });


}

module.exports = onBuild;