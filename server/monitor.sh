# Script to Monitor Health of Instance
# Sends Emails on Increased Load

# Globals
CPU_LIMIT=50
MEM_LIMIT=60
ADMIN_EMAIL=""

# Monitor
# Reference Taken from : # http://stackoverflow.com/questions/9229333/how-to-get-overall-cpu-usage-e-g-57-on-linux
while [ true ]; do
		# CPU Usage
		cpu_usage=$(top -bn1 | grep "Cpu(s)" | cut -d ',' -f4 | sed "s/\([0-9.]*\)* id/\1/" | sed -r "s/\s+//")
		if [ $cpu_usage -g $CPU_LIMIT ]; then
			mail -s "WebAPP Alert" $ADMIN_EMAIL <<< "ALERT: HIGH CPU USAGE: "$cpu_usage	
		fi
		
		# Memory Usage
		mem_entry=$(top -bn1 | grep "KiB Mem:")
		mem_used=$(echo $mem_entry | cut -d ',' -f2 | sed "s/\([0-9]*\)* used/\1/" | sed -r "s/\s+//")
		mem_free=$(echo $mem_entry | cut -d ',' -f3 | sed "s/\([0-9]*\)* free/\1/" | sed -r "s/\s+//")
		mem_total=$((mem_used+mem_free))
		mem_usage=$((mem_used*100/mem_total))
		if [ $mem_usage -g $MEM_LIMIT ]; then
			mail -s "WebAPP Alert" $ADMIN_EMAIL <<< "ALERT: HIGH MEMORY USAGE: "$mem_usage	
		fi
done

# End of Script
