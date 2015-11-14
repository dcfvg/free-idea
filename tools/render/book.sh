content="../../app/content"
cache="$content/cache"
output="$content/posters"

mkdir -p $content $cache $output

nbdir=$(find $cache -type d | wc -l | sed 's/^ *//g')
i=1

printf "\n\tcount\tsize in px\tfile count\n"
printf "|-------------------------------------------------|\n"

for dir in `find $cache -mindepth 1 -type d`
do

  size=$(basename $dir)
  nb=$(find $dir -type f | wc -l | sed 's/^ *//g')

  if( (( "$nb" > 10 )) ) ;then
    printf "\t$i/$nbdir\t$size\t$nb\t\n"
    phantomjs rasterize_pdf.js \
    "http://l:8000/views/by-size-page.php?s=$size" \
    "$output/$size.pdf" \
    A5 0.4 \
    2>&1 | grep -v "userSpaceScaleFactor"
    (( i++ ))
  fi
done

echo "$i pdf";
