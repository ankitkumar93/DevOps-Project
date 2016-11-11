var redis = require('redis');
 
function killCanary(ip, res) {
    var redisClient = redis.createClient(6379, ip, {});
    redisClient.set('canary_on', "false");
    res.send("Canary Killed!");
}

module.exports = killCanary;