var exec = require('child_process').exec;

const scale_cmd = 'sudo sh /home/ubuntu/DevOps-Project/deploy/app.sh';

function scale(res) {
    var child = exec(scale_cmd, {maxBuffer: 1024 * 5000}, function(err, stdout, stderr){
            if (err)
                console.log(err);
            else
                console.log("done");
    });
    res.send("done");
}

module.exports = scale;