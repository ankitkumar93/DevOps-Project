#!/bin/bash

## Script to Deploy the App server to Production ##
app_ip=$(node /home/ubuntu/DevOps-Project/deploy/provision/digitalocean.js)
echo "[appserver]" >> inventory
echo 'node3 ansible_ssh_host='$app_ip' ansible_ssh_user=root ansible_ssh_private_key_file=~/.ssh/id_rsa' >> inventory

## Deploy
ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i canary_inventory /home/ubuntu/DevOps-Project/deploy/ --limit "appserver"

redis_ip=$(cat config.json | jq '.REDIS_IP')

#set canary_on = true on redis server
redis-cli -h redis_ip set canary_on true
