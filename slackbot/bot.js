var slackBot = require('slackbots');
var conversation = require('./watson-services/conversation.js');
var request = require('request');

var url = "http://138.197.32.179:8000";
// create a bot
var bot = new slackBot({
    token: process.env.SLACK_BOT_TOKEN,
    name: 'devops'
});
var self;
bot.on('start', function() {

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('general', "Hi I'm DevOps! I will serve my master for the entire DevOps pipeline");
    //
    // // define existing username instead of 'user_name'
    // bot.postMessageToUser('vkkashya', 'meow!');
    //
    // // If you add a 'slackbot' property,
    // // you will post to another user's slackbot channel instead of a direct message
    // bot.postMessageToUser('vkkashya', 'meow!', { 'slackbot': true });
});

bot.on('message', function(message){
    self = this;
    if(isChatMessage(message) && isChannelConversation(message) && !isFromBot(message) && isMentioningBot(message)){
      console.log("%j", message);
      conversation.sendQuery(message.text, function(error, response){
        if(!error){
          var intent = extractIntent(response);
          var textMsg = extractMessage(response);
          console.log("msg: ", textMsg);
          if(intent === "build"){
            intent = intent + "?branch=master";
          }
          fullUrl = url + "/" + intent;
          console.log("URL: ", fullUrl);
          var channel = getChannelById(message.channel);
          bot.postMessageToChannel(channel.name, textMsg);
          request.get(fullUrl, function(err, res){
            if(!err){
              console.log("Successful! " ,textMsg);
              bot.postMessageToChannel(channel.name, res.body);
            } else{
              console.log("Get request failed");
              bot.postMessageToChannel(channel.name, err);
            }
          })

        } else{
          console.log("Conversation failed to respond!");
          bot.postMessageToChannel(channel.name, error);
        }
      });
    }
});

function isChatMessage(message){
  return message.type === 'message' && Boolean(message.text);
}

function isChannelConversation(message){
  return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
}

function getChannelById(channelId){
  return self.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
}

function isFromBot(message){
  return message.username === "devops";
}

function isMentioningBot(message){
  return message.text.toLowerCase().indexOf('devops') > -1
}

function extractMessage(response){
  return response.output.text[0];
}

function extractIntent(response){
  return response.intents[0].intent;
}
