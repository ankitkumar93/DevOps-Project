#! /bin/bash
# Author: Ankit Kumar (akumar18)

## Data
url="http://54.214.96.27:8000"
url_build=$url"/build?branch="
url_recent=$url"/api/recent"
url_log=$url"/log?id="

## Pre Build
git push
branch=$(git rev-parse --abbrev-ref HEAD)
status=`curl -s $url_build$branch`

## On Build
if [ $status == "failure" ]; then
    git reset HEAD^
    git push -f
fi

# Post Build
logid=`curl -s $url_recent`
open $url_log$logid