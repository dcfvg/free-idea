#!/bin/bash
set -x

 
assets      = $(pwd)"/../../assets/"
scans       = $assets"source/"
result      = $assets"result/"
scans_done  = $scans"done/"
scans_psd   = $scans"done_psd/"

sikuliIDE="/Applications/SikuliX-IDE.app/Contents/runIDE"

sourcetype="gif"
sourcepatern="Page"
resutltype="gif"

mkdir $scans_done
mkdir $scans_psd

function layerToFiles {
  
  for psd in `find $scans -iname "*.psd" -maxdepth 1 -type f`
  do
    dirname=$(dirname "$psd")
  	filename=$(basename "$psd")
  	extension="${filename##*.}"
  	filenameclean="${filename%.*}"
  	
  	mkdir -v $result$filenameclean
  	convert $scans/$filenameclean.psd $result$filenameclean/$filenameclean-%d.$resutltype
		mv $scans/$filenameclean.psd $scans_psd/$filenameclean.psd # archive PSD
		
  done
}

for scan in `find $scans -iname "*.$sourcetype" -maxdepth 1 -type f -exec du {} \; | sort -n`
do
  
  layerToFiles
  
	dirname=$(dirname "$scan")
	filename=$(basename "$scan")
	extension="${filename##*.}"
	filenameclean="${filename%.*}"
	
	if [[ "$filename" == *$sourcepatern* ]]
	then
		echo $filename
		open -a Adobe\ Photoshop\ CC.app $scan 
		$sikuliIDE -r sepa.sikuli
		
		mv $scan $scans_done"/done/"$filename  # move source to done
	fi
	rm -r $result"/*/*-0."$resutltype
	
done