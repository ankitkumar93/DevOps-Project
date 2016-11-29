var redis = require('redis');
var config = require('/root/DevOps-Project/config.json');

function feature(res) {
    var redisClient = redis.createClient(6379, config.REDIS_IP, {});
    redisClient.get("featureFlag", function(err, val){
        if (val == "on")
            redisClient.set("featureFlag", "off");
        else
            redisClient.set("featureFlag", "on");

        res.send("done");
    });
}

module.exports = feature;