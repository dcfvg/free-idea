#!/bin/bash

script=`basename "$0" .sh`
content="../../app/content"
cache="$content/cache"
output="$content/$script"

limit=10000000
format="13cm*20cm"
zooms=( 0.2 0.3 0.1 )
w_maxs=( 5 10 20 50)
h_maxs=( 5 20 80 50)

mkdir -p $content $cache $output

echo $script
printf "\n  format\t zoom\t max w\t max h\t\n"
printf "\n|-------------------------------------------------|\n"

for zoom in "${zooms[@]}"
do
  for w_max in "${w_maxs[@]}"
  do
    for h_max in "${h_maxs[@]}"
    do

      date=`date +%Y-%m-%d:%H:%M:%S`
      printf "  $format\t $zoom\t $w_max\t $h_max \t $date\n"

      phantomjs rasterize_pdf.js \
      "http://l:8000/views/by-size.php?h_max="$h_max"&w_max="$w_max"&limit="$limit \
      "$output/"$script"_"$h_max"x"$w_max"_"$zoom"-"$limit"-"$date".pdf" \
      $format $zoom

    done
  done
done
