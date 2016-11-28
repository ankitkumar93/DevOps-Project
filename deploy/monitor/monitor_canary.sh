# Script to Monitor Health of Instance
# Sends Emails on Increased Load

# Globals
CPU_LIMIT=50
MEM_LIMIT=80
# Monitor
# Reference Taken from : # http://stackoverflow.com/questions/9229333/how-to-get-overall-cpu-usage-e-g-57-on-linux
redis_ip=$(cat config.json | jq '.REDIS_IP' | tr -d '"')
while [ true ]; do
        # CPU Usage
        cpu_usage=$(top -bn1 | grep "Cpu(s)" | cut -d ',' -f4 | sed "s/\([0-9.]*\)* id/\1/" | sed -r "s/\s+//")
        cpu_usage=${cpu_usage/.*}
        if [ $cpu_usage -gt $CPU_LIMIT ]; then
            curl http://138.197.32.179:8000/killcanary
            exit
        fi

        # Memory Usage
        mem_use=$(free -m | awk 'NR==2{printf "%.2f", $3*100/$2 }')
        mem_use=${mem_use/.*}
        if [ $mem_use -gt $MEM_LIMIT ]; then
            curl http://138.197.32.179:8000/killcanary
            exit
        fi
done

# End of Script
