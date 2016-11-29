var conversation = require('./watson-services/conversation.js');

var query = function(req, res){
  conversation.sendQuery(req.body, function(error, response){
    if(!error){
      res.status(200).json(response);
    } else{
      res.status(500).json(error);
    }
  });
}

module.exports = {
  query: query
}
