# DevOps Project

##Milestone - 3 

### Team
Team Blue Drones:
 - Ankit Kumar (akumar18) 
 - Vipul Kashyap (vkkashya)
 - Ashutosh Chaturvedi (achatur)

### Screencast
The screencast video can be found [here](https://youtu.be/WFULrky2Ddw)

### WebApp
The webapp can be found [here](https://github.com/ankitkumar93/WebApp.git)  

### Build Section  
#### Objectives:
- [x] [Automated Deployment](#1)
- [x] [Configuration Management](#2)
- [x] [Monitoring](#3)
- [x] [Autoscale](#4)
- [x] [Feature Flags](#5)
- [x] [Canary Release](#6)  

####<a name="1"></a>Automated Deployment
We used our HW1 script for provisioning a server on AWS for creating new instances for production. The git hook triggers the script for instance creation.  

####<a name="2"></a>Configuration Management  
For configuraiton management of the production servers, we used ansible. We have differend playbook for production and canary deployment.  

####<a name="3"></a>Monitoring  
We created a bash script for monitoring the health of the AWS instance. The script monitors the CPU and Memory utilization on the server, and if reached above a predefined limit, it sends a SMS to the admin using Twilio.  

####<a name="4"></a>Autoscale  

####<a name="5"></a>Feature Flags  
We used redis for implementing feature flags. Our feature flag, when enabled, allows the server to send its IP address to the user.  

####<a name="6"></a>Canary Release  
When we make a commit on branch develop, a canary release is triggered instead of a main production release. The process for deploying the canary server is the same as for the production servers. The only difference is, in canary release, only app is deployed excluding proxy and the redis. Also, the app deployed prints a different message (as it is a canary release).  
During the deployment of our app to production we had deployed a proxy server which acts as a load balancer to route 1:4 requests to canary server. When an alert is raised on the canary server, the canary server removes itself from the central discovery (redis) and hence no more requests are re-directed to it.  
