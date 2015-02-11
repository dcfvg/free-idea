#!/bin/bash
# set -x

interval=3

while true; do

	bash separate-dir.sh /Users/benoit/Scripts/custom/free-idea/tools/separate-2/scans/

	 for (( i=$interval; i>0; i--)); do
    sleep 1 &
    printf "next try in $i s \r"
    wait
    printf "                   \r"
  done
done