var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Model
var historyModel = mongoose.model('history', {
    timestamp: String,
    log: String,
    status: String,
    branch: String
});

module.exports = historyModel;