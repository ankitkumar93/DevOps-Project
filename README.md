# DevOps Project

##Milestone - 1 

### Team
Team Blue Drones:
 - Ankit Kumar (akumar18)
 - Vipul Kashyap (vkkashya)
 - Ashutosh Chaturvedi (achatur) 

### Screencast
The screencast video can be found [here](https://youtu.be/bxLe2BO3UOA)


### Build Section  
#### Objectives:
- [x] [Triggered Build](#1)
- [x] [Dependency Management + Build Script Execution](#2)
- [x] [Build Status + External Post-Build Job Triggers](#3)
- [x] [Multiple Branches, Multiple Jobs](#4)
- [x] [Build History and Display over HTTP](#5)  

####<a name="1"></a>Triggered Build  
We created build server in node.js and hosted it on AWS, listening on port 8000. The server has 3 APIs:
 - ``` /build?branch=<branch> ```: To run a build on a branch (master/develop)
 - ``` / ``` : To view build history
 - ``` /log?id=<logid> ```: To view log of a particular build.

We created a dummy [project](https://github.com/vipulkashyap111/test-app-DevOpsM1/tree/master) (the repo is public so we could clone it during out build process without passing authentication details) using Node.js, which is the application whose commits trigger the build. The code for git post-commit hook is available [here] (https://github.com/ankitkumar93/DevOps-Project/blob/m1_dev/Tests/git-hook).
The post-commit hook basically opens a browser that makes a GET request to the '/build' API<br>

####<a name="2"></a>Dependency Management + Build Script Execution  
We used Docker to enable clean build everytime code is committed to the application. Docker is installed on our AWS server (which hosts the node.js server) and a docker image was created with dependencies in the dockerfile, which can be found [here](https://github.com/ankitkumar93/DevOps-Project/blob/m1_dev/build/Dockerfile).
The docker image was generated once, which used the dockerfile to install basic dependencies. Further, on each build trigger the test-code repo is cloned, and its dependencies are install by calling ``` npm install ```. The build script handles all such calls.
Our build scripts are branch specific scripts which are triggered by [build](https://github.com/ankitkumar93/DevOps-Project/blob/m1_dev/trigger/controller/build.js) file.<br>

####<a name="3"></a>Build Status + External Post-Build Job Triggers  
Once the branch specific build has been triggered by [build](https://github.com/ankitkumar93/DevOps-Project/blob/m1_dev/trigger/controller/build.js), we clone the test-code repo and it runs unit tests on the delivered code to look for failures. The logs are collected and sent to [parser](https://github.com/ankitkumar93/DevOps-Project/blob/m1_dev/trigger/controller/parser.js) which parses and returns either "success" or "failure", for the build job.
Further as externel post-build triggers, once the build job completes, and its status has been determined, our server sends an email using [mailer](https://github.com/ankitkumar93/DevOps-Project/blob/m1_dev/trigger/controller/mailer.js) to the specified email, based on status of the build and the branch it was run on.<br>

####<a name="4"></a>Multiple Branches, Multiple Jobs  
There are 2 branches running for the our test-code: master and develop, hence there are 2 build scripts [build_develop.sh](https://github.com/ankitkumar93/DevOps-Project/blob/m1_dev/build/build_develop.sh) and [build_master.sh](https://github.com/ankitkumar93/DevOps-Project/blob/m1_dev/build/build_master.sh) which are triggered depending on the branch we commit to.
The difference between the two build scripts is that, on develop there is just one unit test, however on the master branch there are 5 unit tests. You can see the difference by seeing the number of passing and failing tests in the build log.<br>

####<a name="5"></a>Build History and Display over HTTP  
We've created a simple UI using AngularJS and Bootstrap and then tied it to our Node.js backend to display the history of build execution with timestamp, build status, branch on which build was triggered and a link to the log file. We used mongDB to store the history, and the mongoDB server runs on the same instance as our web server. The history api implementation can be found [here](https://github.com/ankitkumar93/DevOps-Project/blob/m1_dev/trigger/controller/history.js)
