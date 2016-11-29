var watson = require('watson-developer-cloud');

var workspaceId = process.env.WORKSPACE_ID;
var conversation = watson.conversation({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  version: 'v1',
  version_date: '2016-09-20'
});

// Replace with the context obtained from the initial request
var context = {};

var sendQuery = function(query, callback){
  var body = query;
  conversation.message({
    workspace_id: workspaceId,
    input: {'text': body},
    context: context
  },  function(err, response) {
    if (err){
      console.log('error:', err);
      callback(err);
    }
    else{
      console.log(JSON.stringify(response, null, 2));
      callback(null, response);
    }
  });
}

module.exports = {
  sendQuery: sendQuery
}
