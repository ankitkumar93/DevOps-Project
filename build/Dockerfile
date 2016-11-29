FROM ubuntu:14.04
MAINTAINER Ashutosh Chaturvedi, achatur@ncsu.edu

# update packages and install
RUN apt-get -y update

RUN apt-get -y install git
RUN apt-get -y install nodejs
RUN apt-get -y install npm
RUN sudo ln -s "$(which nodejs)" /usr/bin/node
RUN npm install -g gruntjs
RUN npm install -g istanbul
RUN npm install -g jshint