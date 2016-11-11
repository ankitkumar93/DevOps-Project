var exec = require('child_process').exec;

const deploy_cmd = 'sudo sh /home/ubuntu/DevOps-Project/deploy/canary.sh';

function canary(res) {
    var child = exec(deploy_cmd, {maxBuffer: 1024 * 5000}, function(err, stdout, stderr){
            if (err)
                res.send(err);
    });
    res.send("done");
}

module.exports = canary;