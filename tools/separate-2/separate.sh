#!/bin/bash
# set -x

now=$(date +"%y.%m.%d-%H.%M.%S")
offset=0
margin=500

ext=".mpc"
# path definition
fscan=$(basename $1)
scanid=${fscan%.*}

cache="cache/"
scandir="scan/"
resultdir="result/"

scan=$cache"scan.$ext"
bw2bit=$cache"bw.bmp"

mask=$cache"mask.$ext"
imask=$cache"imask.$ext"
masktrim=$cache"masktrim.$ext"

wandRes=$cache"wandres.$ext"
result="$resultdir$scanid-$now.png"

i=0
function findAndExtract() {
	
	((i++))
	
	id=`printf %04d $i`
	
	result="$resultdir$scanid-$id.png"
	
	echo "—--"
	echo "    part #$i"
	echo "[?] looking for a black pixel"
	
	position=$(convert "$bw2bit" txt:- | grep "black" | head -n 1)
	position="${position%%:*}"
	IFS=', ' read -a pos <<< "$position"
	wandPos=$((pos[0]))","$((pos[1]+$offset)) # go down 
	
	echo " /* try magicwand at $wandPos"


	magicwand $wandPos -t 0 -f mask -m transparent -c trans -r outside $bw2bit $mask
	convert -fuzz 0% -trim +repage $mask $masktrim
	
	mh=$(identify -format "%[fx:h]" $masktrim)
	mw=$(identify -format "%[fx:w]" $masktrim)
	
	sch=$(identify -format "%[fx:h]" $scan)
	scw=$(identify -format "%[fx:w]" $scan)
	
	if (( "$mh" < $((scw-$margin)) ))
		then
		
			echo "->> mask processing ($mh x $mw)"
			convert $mask -channel rgba \
				-fill white -opaque none \
				-transparent black \
				-fill black -opaque white $imask

			echo "-// apply masks"
			composite -compose copy_opacity  $mask $scan $wandRes 	# extract
			
			composite -compose copy_opacity $imask $bw2bit $bw2bit  # delete
			convert -background white -alpha remove $bw2bit $bw2bit #
			
			cropsize=$scw"x"$((sch-pos[1]))"+0+"$((pos[1]))
			echo "[ ] crop research zone ($cropsize)"
			convert -crop $cropsize +repage $bw2bit $bw2bit
			convert -crop $cropsize +repage $scan $scan
			
			echo "[ ] crop result "
			convert -fuzz 30% -trim -background white -alpha remove -fuzz 60% -transparent white -resize 99% $wandRes $result

		else 
			echo "███ mask is too large ! ($mh x $mw)"
			eraser
	fi

	echo "[|] save log image "
	convert -format jpg $bw2bit $resultdir"/log-$id.jpg"

}
function eraser(){
	line="$((pos[0])),$((pos[1])) $wandPos"
	convert -stroke white -draw "line $line" $bw2bit $bw2bit
	echo "███ draw white line @($line)"
}

echo "starting $1 conversion"

rm -rf $cache
mkdir $cache

convert -fuzz 10% -trim +repage $1 $scan

echo "create bitmaps version"
convert -auto-gamma -colors 2 +dither -type bilevel $scan $bw2bit  
convert -format jpg $bw2bit $resultdir"/log-0000.jpg"

while true; do 
	findAndExtract
done
