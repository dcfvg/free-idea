#!/bin/bash
# set -x

now=$(date +"%y.%m.%d-%H.%M.%S")
margin=500
border=25

ext=".mpc"

# path definition
fscan=$(basename $1)
scanid=${fscan%.*}

cache="cache/"
resultdir="result/"$scanid"/"

scan=$cache"scan.$ext"
bw2bit=$cache"bw.bmp"

mask=$cache"mask.$ext"
imask=$cache"imask.$ext"
masktrim=$cache"masktrim.$ext"

wandRes=$cache"wandres.$ext"
result="$resultdir$scanid-$now.png"

i=1
function findAndExtract() {
	
	echo "    "
	echo "    part #$i"
	
	cropsize=$(convert $bw2bit -fuzz 25% -trim -format '%wx%h%O' info:)
	
	echo "[ ] crop research zone ($cropsize)"
	convert -crop $cropsize +repage $bw2bit $bw2bit
	convert -crop $cropsize +repage $scan $scan

	#echo "[|] save log image "
	#convert -format jpg $bw2bit $resultdir"/log-$id.jpg"
	
	id=`printf %04d $i`
	result="$resultdir$scanid-$id.png"
	
	echo "[?] looking for a black pixel"
	position=$(convert "$bw2bit" txt:- | LC_ALL=C fgrep  "black" | head -n 1)
	position="${position%%:*}"
	IFS=', ' read -a pos <<< "$position"
	wandPos=$((pos[0]))","$((pos[1])) # go down 
	
	echo " /* try magicwand at $wandPos"
	
	if [ "$wandPos" == "0,0" ]
		then 
		exit 0
	fi
	
	if (( "$i" > 500 ))
		then
		exit 0
	fi

	./magicwand $wandPos -t 25 -f mask -m transparent -c trans -r outside $bw2bit $mask
	convert -fuzz 0% -trim +repage $mask $masktrim

	echo "->> mask processing"
	convert $mask -channel rgba \
		-fill white -opaque none \
		-transparent black \
		-fill black -opaque white $imask

	echo "-// apply masks"
	composite -compose copy_opacity $mask $scan $wandRes 	# extract
	composite -compose copy_opacity $imask $bw2bit $bw2bit  # delete
	convert -background white -alpha remove $bw2bit $bw2bit #
	
	echo "[ ] trim result"
	convert -fuzz 30% -trim -background white -alpha remove $wandRes $wandRes

	w=$(identify -format %[fx:w] $wandRes)
	h=$(identify -format %[fx:h] $wandRes)

	surface=$(( $w * $h ))
	if (( "$surface" < 100 ))
		then
			echo " X  cancel, result surface is too small ($w x $h px : $surface px2 )"
		else
			echo " ~  remove background and save ($w x $h)"
			convert -fuzz 30% -transparent white -resize 99% $wandRes $result
			((i++))
	fi
}

echo "=== starting $1 conversion"

model=$(identify -format %[exif:Model] $1)
if [[ "$model" == *Doxie* ]] 
then
	rm -rf $cache
	mkdir $cache "result/" $resultdir

	echo "-#- scan clean "
	convert \
	 -crop +$border+$border -crop -$border-$border -border $borderx$border \
	 -fuzz 25% -transparent white \
	 -modulate 100,130,100 \
	 -background white -alpha remove \
	 +repage \
	 $1 $scan

	convert $scan $resultdir$scanid.png

	echo "| | create bitmaps version"
	convert -auto-gamma -colors 2 +dither -type bilevel $scan $bw2bit  

	while true; do 
		findAndExtract
	done
fi
