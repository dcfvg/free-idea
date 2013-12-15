#!/bin/bash
# set -x

assets="assets/"
scans=$assets"source/"
result=$assets"result/"
sikuliIDE="/Applications/SikuliX-IDE.app/Contents/runIDE"

for scan in `find $scans -iname "*.png" -maxdepth 1 -type f`
do
	dirname=$(dirname "$scan")
	filename=$(basename "$scan")
	extension="${filename##*.}"
	filenameclean="${filename%.*}"
	
	echo $filename
	open -a Adobe\ Photoshop\ CC.app $scan 
	$sikuliIDE -r sepa.sikuli
	
	mkdir -v $result$filenameclean
	
	convert $dirname/$filenameclean.psd $result$filenameclean/$filenameclean-%d.png
	rm $dirname/$filenameclean.psd
	
	mv $scan $dirname"/done/"$filename
done

rm -r $result/*/*-0.png
