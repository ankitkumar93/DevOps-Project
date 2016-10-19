# DevOps Project

##Milestone - 2 

### Team
Team Blue Drones:
 - Ankit Kumar (akumar18) 
 - Vipul Kashyap (vkkashya)
 - Ashutosh Chaturvedi (achatur)

### Screencast
The screencast video can be found [here](https://youtu.be/WFULrky2Ddw)


### Build Section  
#### Objectives:
- [x] [Test Suites](#1)
- [x] [Advanced Testing](#2)
- [x] [Basic Analysis](#3)
- [x] [Custom Metrics](#4)
- [x] [Gates](#5)

#### System Under Test
The OpenSource project we choose to run through our pipeline is a library for nodejs called [Smart Calculator] (https://github.com/dominhhai/calculator).
We forked this repository, so that we can add our advanced testing and analysis files and could commit to it. Our forked repository can be found [here](https://github.com/vipulkashyap111/calculator)

#### Report
The report can be viewed in the build history on our webapp, in the form of a log. This log contains the entire report of build, test and analysis phase.

#### Our pipeline
This entire milestone is added to our build setup from milestone 1 (which is a nodejs app built from scratch), which is hosted on aws and uses docker for the build server.

####<a name="1"></a>Test Suites  
The project we choose has a test suite of its own. It's test cases are basically covered up in 3 files under the tests directory. We are running istanbul to measure coverage, and also on running istanbul the test cases are run and the test result is reported, along with the coverage result.

####<a name="2"></a>Advanced Testing
We are using test case generation for advanced testing. The test case generation part generates test cases for the calc.js file. Originally, the test for calc.js has a very low coverage as below:
```
=============================== Coverage summary ===============================

Statements   : 32.61% ( 15/46 )
Branches     : 0% ( 0/16 )
Functions    : 7.14% ( 1/14 )
Lines        : 36.59% ( 15/41 )
================================================================================
```
Our generated test cases improve the coverage as shown below:
```
=============================== Coverage summary ===============================

Statements   : 62% ( 31/50 )
Branches     : 31.25% ( 5/16 )
Functions    : 28.57% ( 4/14 )
Lines        : 66.67% ( 30/45 )
================================================================================
```
In our pipeline we first run istanbul for the original test for calc.js and then we generate our own test cases, through our test case generator, and then run istanbul on this new test file. This is so that we can demonstrate our implementation of advanced testing and also that it improves coverage. Our test case generator's code can be found [here](https://github.com/ankitkumar93/DevOps-Project/blob/m2_dev/build/test/adv_test.js).

####<a name="3"></a>Basic Analysis
For basic analysis, we are using jhlint on our code. We have configured it so that, it allows some things (like missing semicolon), and detects and reports some other things (like const declarations). The configuration file for jhlint can be found [here](https://github.com/ankitkumar93/DevOps-Project/blob/m2_dev/build/analysis/.jshintrc)

####<a name="4"></a>Custom Metrics
For custom metrics, we have implemented Max Conditions, Long Methods and Security Token Detection. The code for custom metrics implementation can be found [here](https://github.com/ankitkumar93/DevOps-Project/blob/m2_dev/build/analysis/analysis.js).

####<a name="5"></a>Gates
We are using a post-commit script to run our build. Once the build completes it triggers the test and analysis scripts. Continuing on from our milestone 1, we are building our own continous integration system from scratch, so, we have a nodejs webserver which exposes api for the post-commit script to ping. On pinging this api, the build is triggered, which is followed by testing and analysis. The entire log of build, test and analysis is parsed by our system to compute various metrics, and then when there is an edge case (some metric is not fulfilled ), our system reports a failure and rejects the commit, by using git reset. On a success, the commit is allowed, and either way in the end the post-commit script opens up a browser window to show the log of the current build, test and analysis phase on the application. We are currently using security token detection to show when the analysis fails and the commit is reject, and on removing this token the analysis passes and the commit is allowed. The code for the post-commit hook can be found [here](https://github.com/ankitkumar93/DevOps-Project/blob/m2_dev/build/githook.sh).

