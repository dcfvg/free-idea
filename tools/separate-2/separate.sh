#!/bin/bash
# set -x

now=$(date +"%y.%m.%d-%H.%M.%S")
border=5 				# cropblack borders (±25 for 150 dpi)
minSurface=30 	# smallest piece in px2 (±100 for 150 dpi)

ext=".mpc"

# path definition
fscan=$(basename $1)
scanid=${fscan%.*}

cache="cache/"$scanid"/"
resultdir="../../sources/separate-result/"$scanid"/"
resultdir=${2:-$resultdir}

scan=$cache"scan.$ext"
bw2bit=$cache"bw.bmp"

mask=$cache"mask.$ext"
imask=$cache"imask.$ext"
masktrim=$cache"masktrim.$ext"

wandRes=$cache"wandres.$ext"
result="$resultdir$scanid-$now.png"

i=1
try=1

wandPosPrev=""
wandPos=""

function findAndExtract() {
	
	echo "    "
	echo "    part #$i research $try"
	
	cropsize=$(convert $bw2bit -fuzz 25% -trim -format '%wx%h%O' info:)
	
	echo "[ ] crop research zone ($cropsize)"
	convert -crop $cropsize +repage $bw2bit $bw2bit
	convert -crop $cropsize +repage $scan $scan

	#echo "[|] save log image "
	#convert -format jpg $bw2bit $resultdir"/log-$id.jpg"
	
	((try++))

	id=`printf %04d $i`
	result="$resultdir$scanid-$id.png"
	
	echo " ?  looking for a black pixel"
	position=$(convert "$bw2bit" txt:- | LC_ALL=C fgrep  "black" | head -n 1)
	position="${position%%:*}"
	IFS=', ' read -a pos <<< "$position"
	wandPos=$((pos[0]))","$((pos[1])) # go down 

	if [ "$wandPos" == "0,0" ]
		then 
		echo "  X quit because of bad magicwand position ($wandPos)"
		exit 0
	fi

	if [ "$wandPos" == "$wandPosPrev" ]
		then 
			((wandAlert++))
		else
			wandAlert=0
	fi
	if (( "$wandAlert" > 10 ))
		then
		exit 0
	fi
	if (( "$try" > 1000 ))
		then
		exit 0
	fi


	echo " /* try magicwand at $wandPos"
	./magicwand $wandPos -t 25 -f mask -m transparent -c trans -r outside $bw2bit $mask
	convert -fuzz 0% -trim +repage $mask $masktrim

	echo ">>> mask processing"
	convert $mask -channel rgba \
		-fill white -opaque none \
		-transparent black \
		-fill black -opaque white $imask

	echo "/// apply masks"
	composite -compose copy_opacity $mask $scan $wandRes 	# extract
	composite -compose copy_opacity $imask $bw2bit $bw2bit  # delete
	convert -background white -alpha remove $bw2bit $bw2bit #
	
	echo "[ ] trim result"
	convert -fuzz 30% -trim -background white -alpha remove $wandRes $wandRes

	w=$(identify -format %[fx:w] $wandRes)
	h=$(identify -format %[fx:h] $wandRes)
	surface=$(( $w * $h ))
	
	if (( "$surface" < $minSurface ))
		then
			echo " X  cancel, result surface is too small ($w x $h px : $surface px2 )"
		else
			echo " ~  remove background and save ($w x $h)"
			convert -fuzz 30% -transparent white -resize 99% $wandRes $result
			((i++))
	fi

	wandPosPrev=$wandPos
}

echo "=== starting $1 conversion"

model=$(identify -format %[exif:Model] $1)
#if [[ "$model" == *Doxie* ]] 
#then

	mkdir "cache" $cache $resultdir

	echo "-#- scan clean " $model
	convert \
	 -crop +$border+$border -crop -$border-$border -border $borderx$border \
	 -fuzz 25% -transparent white \
	 -modulate 100,130,100 \
	 -background white -alpha remove \
	 +repage \
	 -fill white -draw 'point 0,0' \
	 $1 $scan

	#mv $1 $resultDone

	# keep full draw
	convert $scan $resultDone$scanid.png

	echo "| | create bitmaps version"
	convert -auto-gamma -colors 2 +dither -type bilevel $scan $bw2bit  

	while true; do 
		findAndExtract
	done
	rm -rf $cache

#fi
