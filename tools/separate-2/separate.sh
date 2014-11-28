#!/bin/bash

now=$(date +"%y.%m.%d-%H.%M.%S")
offset=3

# create bitmap version 
convert -auto-level -colors 2 +dither -type bilevel $1 "cache/$(basename $1).bmp"  

# get first black pixel
position=$(convert "cache/$(basename$1).bmp" txt:- | grep "black" | head -n 1)
position="${position%%:*}"
IFS=', ' read -a pos <<< "$position"
wandPos=$((pos[0]))","$((pos[1]+$offset)) # got down 

echo "wand at $wandPos"
magicwand 1631,626 -t 50 -f image -m transparent -c trans $1 "cache/res.png"

# crop the result
convert -fuzz 30% -trim "cache/res.png" "result/$now.png"