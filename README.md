##Milestone - 4

### Team
Team Blue Drones:
 - Ankit Kumar (akumar18) 
 - Vipul Kashyap (vkkashya)
 - Ashutosh Chaturvedi (achatur)

### Screencast
The screencast videos can be found below:
<br>
[Milestone 1 to 3](https://youtu.be/kq_FXcvgwno)
<br>
[Milestone 4](https://youtu.be/NnV-fjyhLJs)

### Objective  
DevOps is a Slack Bot which is designed to run/execute/process components of Continuous Deployment. We can pass commands to DevOps from Slack channel like a normal conversation and the bot will take these instructions, translate them and invoke the related commands using the node app running in the background. DevOps make use of Watson Conversation to process the instructions given in simple language and capture the commands from the statements.

### Requirements  
Before using DevOps for any activity, it is required that all the related pre-requisites related to continuous deployment are already setup in the system. For the custom SlackBot it is required that NodeJs (at least version 0.10) and NPM is installed in the machine. 

### Implementation Details and Usage   
Once the slackbot is attached to a Slack channel, user can pass instructions in plain english like ```Please turn on the feature flags``` these statements are intercepted by the node application which is started using [bot app](https://github.com/ankitkumar93/DevOps-Project/blob/m4/slackbot/bot.js). The app makes connection with [Watson Conversation](https://github.com/ankitkumar93/DevOps-Project/blob/m4/slackbot/watson-services/conversation.js) and gets the intent of the user command. The Watson Conversation API connects with the already trained data to fetch the intent from the user statements. The intent is sent back to the user along with the corresponding response. The intent of the command (such as **build**, **deploy**, **canary** etc.) is used by the APIs to call the corresponding functions on the build server.  

### How to use DevOps  
The slack bot DevOps can be used directly from the slack channel conversation.
```
devops [intent] statement
```
The bot will capture the tokens and execute the commands.  

### References
https://www.ibm.com/blogs/watson/2016/10/easy-slack-integration-watson-conversation/  
https://scotch.io/tutorials/building-a-slack-bot-with-node-js-and-chuck-norris-super-powers
