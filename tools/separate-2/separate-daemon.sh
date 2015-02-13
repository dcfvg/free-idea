#!/bin/bash
# set -x

interval=3

prescans="/Users/benoit/Scripts/custom/free-idea/sources/pre-scans"
scans="/Users/benoit/Scripts/custom/free-idea/sources/scans/"

while true; do
	
	detox -r $prescans
	
	for file in `find $prescans -iname "*.JP*G"`
	do
		mv $file $scans"IMG_"$(stat -f "%m" $file)".jpg"
	done
	
	bash separate-dir.sh $scans

	for (( i=$interval; i>0; i--)); do
		sleep 1 &
		printf "next try in $i s \r"
		wait
		printf "                   \r"
	done
done