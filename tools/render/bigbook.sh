#!/bin/bash

script=`basename "$0"`
content="../../app/content"
cache="$content/cache"
output="$content/$script"

limit=10000000
format="13cm*20cm"
zooms=( 1 0.5 0.6 )
w_maxs=( 2 8 )
h_maxs=( 2 50 )

mkdir -p $content $cache $output

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
      "$output/book_"$h_max"x"$w_max"_"$zoom"-"$limit".pdf" \
      $format $zoom

    done
  done
done
