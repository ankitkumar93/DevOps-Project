var exec = require('child_process').exec;

const deploy_cmd = 'sudo sh /home/ubuntu/DevOps-Project/deploy/prod.sh';

function deploy(res) {
    var build_process = exec(deploy_cmd, {maxBuffer: 1024 * 5000}, function(err, stdout, stderr){
            if (err)
                res.send(err);
            else
                res.send("Done!");
    });
}

module.exports = deploy;