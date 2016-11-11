# Script to Monitor Health of Instance
# Sends Emails on Increased Load

# Globals
CPU_LIMIT=50
MEM_LIMIT=80
# Monitor
# Reference Taken from : # http://stackoverflow.com/questions/9229333/how-to-get-overall-cpu-usage-e-g-57-on-linux
while [ true ]; do
		# CPU Usage
		cpu_usage=$(top -bn1 | grep "Cpu(s)" | cut -d ',' -f4 | sed "s/\([0-9.]*\)* id/\1/" | sed -r "s/\s+//")
		cpu_usage=${cpu_usage/.*}
		if [ $cpu_usage -gt $CPU_LIMIT ]; then

			curl http://54.214.96.27:8000/alert/c
			curl http://54.214.96.27:8000/scale

			exit
		fi

		# Memory Usage
		mem_use=$(free -m | awk 'NR==2{printf "%.2f", $3*100/$2 }')
		mem_use=${mem_use/.*}
		if [ $mem_use -gt $MEM_LIMIT ]; then

			curl http://54.214.96.27:8000/alert/m
			curl http://54.214.96.27:8000/scale

			exit
		fi
done

# End of Script
