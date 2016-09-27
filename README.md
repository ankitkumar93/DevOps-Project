# DevOps Project
Developers:
 - Ankit Kumar (akumar18)
 - Vipul Kashyap (vkkashya)
 - Ashutosh Chaturvedi (achatur)

##Milestone - 1  

###Build Section  
Explain setup. Used AWS, Docker bla bla bla  
###Objectives:
- [x] [Triggered Build](#1)
- [x] [Dependency Management + Build Script Execution](#2)
- [x] [Build Status + External Post-Build Job Triggers](#3)
- [x] [Multiple Branches, Multiple Jobs](#4)
- [x] [Build History and Display over HTTP](#5)  

####<a name="1"></a>Triggered Build  
The Build server we created is deployed on AWS and is accessible at http://54.213.145.239:8000.  
We created a dummy [project](https://github.com/vipulkashyap111/test-app-DevOpsM1/tree/master) (the repo is public so we could clone it in our build script without passing authentication details) using Node.js, which is the application whose commits trigger the build. The code for git post-commit hook is available [here](https://github.com/ankitkumar93/DevOps-Project/blob/m1_dev/Tests/git-hook). 
####<a name="2"></a>Dependency Management + Build Script Execution  
We used Docker to enable clean build everytime code is committed to the application. The Docker instance is deployed on AWS.
The Dockerfile script [Link](https://github.com/ankitkumar93/DevOps-Project/blob/m1_dev/build/Dockerfile) is triggered upon commit which installs all the dependencies required to run the application. 
####<a name="3"></a>Build Status + External Post-Build Job Triggers  
Once the branch specific build has been triggered by [build](https://github.com/ankitkumar93/DevOps-Project/blob/m1_dev/trigger/controller/build.js), we run unit tests on the delivered code to look for failures, the logs are collected and sent to [parser](https://github.com/ankitkumar93/DevOps-Project/blob/m1_dev/trigger/controller/parser.js) which yields either "success" or "failure" and display it on the site.
Also an email is sent by [mailer](https://github.com/ankitkumar93/DevOps-Project/blob/m1_dev/trigger/controller/mailer.js) which sends customized emails to the developer based on success or failure of the build.
####<a name="4"></a>Multiple Branches, Multiple Jobs  
There are 2 branches running for the application: master and develop, hence there are 2 build scripts [build_develop.sh](https://github.com/ankitkumar93/DevOps-Project/blob/m1_dev/build/build_develop.sh) and [build_master.sh](https://github.com/ankitkumar93/DevOps-Project/blob/m1_dev/build/build_master.sh) which are triggered depending on the branch we commit to.
####<a name="5"></a>Build History and Display over HTTP  
We've created a simple UI using angular, bootstrap and jquery to display the [history](http://54.213.145.239:8000/api/history) of build execution with timestamp, build status, branch on which build was triggered and a link to the log file. 
