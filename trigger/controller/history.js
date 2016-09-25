var historyModel = require('../model/historyModel.js');

var historyController = {
    getHistory: function(res){
        historyModel.find({}, function(err, data){
            res.json(data);
        });
    },

    getLog: function(id, res){
        historyModel.find({'id': id}, function(err, data){
            res.json(data[0]);
        });
    },

    addBuild: function(id, timestamp, log, status, branch, callback){
        var buildRecord = new historyModel({
            id: id,
            timestamp: timestamp,
            log: log,
            status: status,
            branch: branch
        });

        buildRecord.save(callback);
    }
};

module.exports = historyController;