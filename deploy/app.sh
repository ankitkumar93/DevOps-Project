#!/bin/bash

## Script to Deploy the App server to Production ##
app_ip=$(node /root/DevOps-Project/deploy/provision/digitalocean.js)
echo "[appserver]" > app_inventory
echo 'node ansible_ssh_host='$app_ip' ansible_ssh_user=root ansible_ssh_private_key_file=~/.ssh/id_rsa' >> app_inventory

sleep 120

## Deploy
ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i app_inventory /home/ubuntu/DevOps-Project/deploy/configure_app.yml --limit "appserver"