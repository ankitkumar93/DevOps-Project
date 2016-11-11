url="http://54.214.96.27:8000"
url_build=$url"/build?branch="
url_deploy=$url"/deploy?branch="
url_deploy=$url"/canary"

## Pre Build
git push
branch=$(git rev-parse --abbrev-ref HEAD)
status=`curl -s $url_build$branch`

## On Build
if [ $status == "failure" ]; then
    git reset HEAD^
    git push -f
else
    if [ $branch == "master" ]; then
	   curl -s $url_deploy$branch
    else
        curl -s $url_canary
    fi
fi
