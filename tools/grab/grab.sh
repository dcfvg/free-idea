assets="../../assets"
cache="$assets/cache"
output="$assets/posters"


for dir in `find $cache -type d`
do

  size=$(basename $dir)
  nb=$(find $dir -type f | wc -l)
  

  
  if( (( "$nb" > 10 )) ) ;then
    printf "$size\t$nb\n"
    phantomjs rasterize.js \
    "http://dev.free-idea.dcfvg.com/tools/dotdotdot.php?s=$size" \
    "$output/$size.pdf" \
    A5 0.4 \
    2>&1 | grep -v "userSpaceScaleFactor"
    (( i++ ))
  fi
done

echo "$i pdf";