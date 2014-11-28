#!/bin/bash
# set -x

now=$(date +"%y.%m.%d-%H.%M.%S")
offset=3

# path definition
scan=$1
fscan=$(basename $scan)
scanid=${fscan%.*}

cache="cache/"
scandir="scan/"
resultdir="result/"

BWbmp="$cache$scanid-bw.bmp"
greyscale="$cache$scanid-grey.png"

wandRes="$cache$scanid-wandres.png"
result="$resultdir$scanid-$now.png"

# create bitmap version 
convert -auto-level -colors 2 +dither -type bilevel $scan $BWbmp  

convert -auto-gamma -auto-level -colorspace Gray -colors 16 $scan $greyscale  


# get first black pixel
position=$(convert "$BWbmp" txt:- | grep "black" | head -n 1)
position="${position%%:*}"
IFS=', ' read -a pos <<< "$position"
wandPos=$((pos[0]))","$((pos[1]+$offset)) # got down 

echo "wand at $wandPos"
magicwand 1631,626 -t 60 -f image -m transparent -c trans $greyscale $wandRes

# crop the result
convert -fuzz 30% -trim $wandRes $result