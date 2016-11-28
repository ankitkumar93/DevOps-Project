var exec = require('child_process').exec;

const deploy_cmd = 'sudo sh /root/DevOps-Project/deploy/canary.sh';

function canary(res) {
    var child = exec(deploy_cmd, {maxBuffer: 1024 * 5000}, function(err, stdout, stderr){
            if (err)
                console.log(err);
            else
                console.log("done");
    });

    child.stdout.on("data", function(data){
        console.log(data);
    });


    res.send("Canary!");
}

module.exports = canary;