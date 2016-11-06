# Script to Monitor Health of Instance
# Sends Emails on Increased Load

# Globals
CPU_LIMIT=50
MEM_LIMIT=60
NET_LIMIT=70
ADMIN_EMAIL=""

# Monitor
while [ true ]; do
		usage=$(cat /proc/loadavg)

		# CPU Usage	
		cpu_uage=$(echo $usage | cut -d ' ' -f1)
		if [ $cpu_usage -g $CPU_LIMIT ]; then
			mail -s "WebAPP Alert" $ADMIN_EMAIL <<< "ALERT: HIGH CPU USAGE: "$cpu_usage	
		fi
		
		# Memory Usage
		mem_uage=$(echo $usage | cut -d ' ' -f2)
		if [ $mem_usage -g $MEM_LIMIT ]; then
			mail -s "WebAPP Alert" $ADMIN_EMAIL <<< "ALERT: HIGH MEMORY USAGE: "$mem_usage	
		fi
		
		# Network Usage
		net_uage=$(echo $usage | cut -d ' ' -f3)
		if [ $net_usage -g $NET_LIMIT ]; then
			mail -s "WebAPP Alert" $ADMIN_EMAIL <<< "ALERT: HIGH NETWORK USAGE: "$net_usage	
		fi
done

# End of Script
