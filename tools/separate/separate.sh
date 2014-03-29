#!/bin/bash
set -x

 
assets=$(pwd)"/../../assets/"
scans=$assets"source/"
result=$assets"result/"
sikuliIDE="/Applications/SikuliX-IDE.app/Contents/runIDE"

sourcetype="gif"
sourcepatern="Page"
resutltype="png"

for scan in `find $scans -iname "*.$sourcetype" -maxdepth 1 -type f -exec du {} \; | sort -n`
do
	dirname=$(dirname "$scan")
	filename=$(basename "$scan")
	extension="${filename##*.}"
	filenameclean="${filename%.*}"
	
	if [[ "$filename" == *$sourcepatern* ]]
	then
		echo $filename
		open -a Adobe\ Photoshop\ CC.app $scan 
		$sikuliIDE -r sepa.sikuli

		mkdir -v $result$filenameclean
		
		convert $dirname/$filenameclean.psd $result$filenameclean/$filenameclean-%d"."$resutltype
		rm $dirname/$filenameclean.psd
		
		mv $scan $dirname"/done/"$filename
	fi
	rm -r $result"/*/*-0."$resutltype
	
done