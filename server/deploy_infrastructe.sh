#!/bin/bash
## Script to Deploy the Redis server to Production ##
# redis_ip=$(node AWS_main.js)
# echo '{"REDIS_IP":"'$redis_ip'"}' > config.json
# echo "[redisserver]" > inventory
# echo 'node ansible_ssh_host='$redis_ip' ansible_ssh_user=ubuntu ansible_ssh_private_key_file=./key/privateKey.key' >> inventory
#
# # Deploy
# ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i inventory configure_playbook.yml --limit redisserver

## Script to Deploy the Proxy server to Production ##
# proxy_ip=$(node AWS_main.js)
# echo "[proxyserver]" >> inventory
# echo 'node ansible_ssh_host='$proxy_ip' ansible_ssh_user=ubuntu ansible_ssh_private_key_file=./key/privateKey.key' >> inventory
#
# # Deploy
# ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i inventory configure_playbook.yml --limit proxyserver

# Script to Deploy the App server to Production ##
app_ip=$(node AWS_main.js)
echo "[appserver]" >> inventory
echo 'node ansible_ssh_host='$app_ip' ansible_ssh_user=ubuntu ansible_ssh_private_key_file=./key/privateKey.key' >> inventory

## Deploy
ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i inventory configure_playbook.yml --limit appserver
