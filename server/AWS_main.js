<<<<<<< HEAD:server/AWS_main.js
=======
var jsonfile = require('jsonfile')
>>>>>>> 18ab95983a503f1638c67453b9416a0fcb4ad9d5:AWS_main.js
var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: "",
    secretAccessKey: "",
	region: 'us-west-2'
});
const fs = require('fs');
var ec2 = new AWS.EC2();

var params = {
	ImageId: "ami-d732f0b7",
	InstanceType: "t2.micro",
	MinCount: 1,
	MaxCount: 1,
	SecurityGroupIds : [''],		// Enter your security group id
	SecurityGroups : ['DevOps'],	// Enter your security group name
	KeyName : ""					// Enter your key pair name here
}

var inventory = "inventory"
var configjson = "config.json"

// Create the instance
ec2.runInstances(params, function(err, data) {
  if (err) {
  	console.log("Could not create instance", err); return;
  }

  var instanceId = data.Instances[0].InstanceId;
  // console.log("Created instance: ", instanceId);
  //getDroplet(instanceId);
  setTimeout(function() { getDroplet(instanceId); }, 5000);
});


var getDroplet = function(instanceId){
	var descparams = {
		InstanceIds: [instanceId]
	}
	ec2.describeInstances(descparams, function(error, response){
		if(error){
			console.log(error);
		}
		else{
			var ip_address = response.Reservations[0].Instances[0].PublicIpAddress;
			console.log(ip_address);
		}
	});
};
