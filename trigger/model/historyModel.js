var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Model
var historyModel = mongoose.model('history', {
    id: {type:String, required: true, unique: true},
    timestamp: String,
    log: String,
    status: String,
    branch: String
});

module.exports = historyModel;