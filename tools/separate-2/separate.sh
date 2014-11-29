#!/bin/bash
# set -x

now=$(date +"%y.%m.%d-%H.%M.%S")
offset=3
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

grey=$cache"grey.$ext"
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
	echo "GO! part #$i"
	echo "[?] looking for a black pixel"
	
	position=$(convert "$bw2bit" txt:- | grep "black" | head -n 1)
	position="${position%%:*}"
	IFS=', ' read -a pos <<< "$position"
	wandPos=$((pos[0]))","$((pos[1]+$offset)) # go down 
	color=`convert $bw2bit -format "%[pixel:s.p{$wandPos}]" info:` # get the pixel color
	
	echo " /* try magicwand at $wandPos on $color pixel"
	
	if [ "$color" == "black" ]
		then
			
			magicwand $wandPos -t 70 -f mask -m transparent -c trans -r outside $grey $mask
			
			convert -fuzz 30% -trim $mask $masktrim
			
			mh=$(identify -format "%[fx:h]" $masktrim)
			mw=$(identify -format "%[fx:w]" $masktrim)
			
			sch=$(identify -format "%[fx:h]" $scan)
			scw=$(identify -format "%[fx:w]" $scan)
			
			
			if (( "$mh" < $((scw-$margin)) )) #[[ $(($mh)) < 3000 ]] # &&  [[ $(($mw)) < $((scw-$margin)) ]]
				then
				
					echo "->> mask processing ($mh x $mw)"
					convert $mask -channel rgba \
						-fill white -opaque none \
						-transparent black \
						-fill black -opaque white $imask

					echo "-// apply masks"
					composite -compose copy_opacity $mask $scan $wandRes 		# extract

					composite -compose copy_opacity $imask $bw2bit $bw2bit  # delete
					composite -compose copy_opacity $imask $grey $grey			#

					convert -background white -alpha remove $bw2bit $bw2bit
					convert -background white -alpha remove $grey $grey
					
					cropsize=$scw"x"$((sch-pos[1]))"+0+"$((pos[1]))
					echo "[ ] crop research zone ($cropsize)"
					convert -crop $cropsize +repage $bw2bit $bw2bit
					convert -crop $cropsize +repage $grey $grey
					convert -crop $cropsize +repage $scan $scan
					
					echo "[ ] crop result "
					convert -fuzz 30% -trim $wandRes $result

				else
					echo "███ mask is too large ! ($mh x $mw)"
					eraser
			fi
		
		else
			echo "███ pixel is $color !"
			eraser		
	fi
	
	echo "[|] save log image "
	convert -format jpg $grey $resultdir"/log-$id.jpg"

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
# 
# sch=$(identify -format "%[fx:h]" $scan)
# scw=$(identify -format "%[fx:w]" $scan)
# 
# echo "trimmed scan size : $scw x $sch"

echo "create bitmaps version"
convert -auto-gamma -colors 2 +dither -type bilevel $scan $bw2bit  
convert -auto-gamma -auto-level -colorspace Gray -colors 16 $scan $grey
convert -format jpg $grey $resultdir"/log-0000.jpg"

while true; do 
	findAndExtract
done
