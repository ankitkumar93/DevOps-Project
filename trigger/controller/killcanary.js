var redis = require('redis');
var fs = require('fs');
var config = require('/root/DevOps-Project/config.json');
 
function killCanary(res) {
    var redisClient = redis.createClient(6379, config.REDIS_IP, {});
    redisClient.set('canary_on', "false");
    res.send("Canary Killed!");
}

module.exports = killCanary;