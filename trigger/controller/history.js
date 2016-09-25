var historyModel = require('../model/historyModel.js');

var historyController = {
    getHistory: function(req, res){
        historyModel.find({}, function(err, data){
            res.send(data);
        });
    },

    addBuild: function(timestamp, log, status, branch, callback){
        var buildRecord = new historyModel({
            timestamp: timestamp,
            log: log,
            status: status,
            branch: branch
        });

        buildRecord.save(callback);
    }
};

module.exports = historyController;