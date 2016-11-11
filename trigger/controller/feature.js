var redis = require('redis');

function feature(ip, res) {
    var redisClient = redis.createClient(6379, ip, {});
    redisClient.get("featureFlag", function(err, val){
        if (val == "on")
            redisClient.set("featureFlag", "off");
        else
            redisClient.set("featureFlag", "on");

        res.send("done");
    });
}