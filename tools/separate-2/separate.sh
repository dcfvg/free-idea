#!/bin/bash
# set -x

now=$(date +"%y.%m.%d-%H.%M.%S")
offset=3

ext=".mpc"
# path definition
fscan=$(basename $1)
scanid=${fscan%.*}

cache="cache/"
scandir="scan/"
resultdir="result/"

scan=$cache"scan.$ext"
bw2bit=$cache"bw.bmp"

grey=$cache"grey.$ext"
mask=$cache"mask.$ext"
imask=$cache"imask.$ext"

wandRes=$cache"wandres.$ext"
result="$resultdir$scanid-$now.png"

i=0

function findAndExtract() {
	
	
	((i++))
	
	id=`printf %04d $i`
	
	result="$resultdir$scanid-$id.png"
	
	echo "—--"
	echo "!!! part #$i"
	echo "[?] looking for a black pixel"
	
	position=$(convert "$bw2bit" txt:- | grep "black" | head -n 1)
	position="${position%%:*}"
	IFS=', ' read -a pos <<< "$position"
	wandPos=$((pos[0]))","$((pos[1]+$offset)) # got down 

	#wandPos="1631,626"

	echo " /* wand at $wandPos"
	magicwand $wandPos -t 50 -f mask -m transparent -c trans -r outside $grey $mask

	echo "->> mask processing"
	convert $mask -channel rgba \
		-fill white -opaque none \
		-transparent black \
		-fill black -opaque white $imask

	echo "/-/ apply masks"
	composite -compose copy_opacity $mask $scan $wandRes 		# extract
	
	composite -compose copy_opacity $imask $bw2bit $bw2bit  # delete
	composite -compose copy_opacity $imask $grey $grey			#
	
	convert -flatten $bw2bit $bw2bit
	convert -format jpg $bw2bit $resultdir"/log-$id.jpg"

	echo "[ ] crop result "
	convert -fuzz 30% -trim $wandRes $result
}

echo "starting $1 conversion"

echo "create bitmaps version"
convert $1 $scan
convert -auto-gamma -colors 2 +dither -type bilevel $scan $bw2bit  
convert -auto-gamma -auto-level -colorspace Gray -colors 16 $scan $grey  

while true; do 
	findAndExtract
done
