var exec = require('child_process').exec;

const scale_cmd = 'sudo sh /root/DevOps-Project/deploy/app.sh';

function scale(res) {
    var child = exec(scale_cmd, {maxBuffer: 1024 * 5000}, function(err, stdout, stderr){
            if (err)
                console.log(err);
            else
                console.log("done");
    });

    child.stdout.on("data", function(data){
        console.log(data);
    });

    res.send("Scale!");
}

module.exports = scale;