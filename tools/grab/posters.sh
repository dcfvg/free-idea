assets="../../assets"
cache="$assets/cache"
output="$assets/posters"

# phantomjs rasterize.js \
# "http://dev.free-idea.dcfvg.com/tools/repartition.php" \
# "$output/repartition.pdf" \
# A0 1 \
# 2>&1 | grep -v "userSpaceScaleFactor"

sizes=( 0.5 0.45 0.40 0.35 0.30 0.25)
#resolution="19866px*56174px" # A0x2 @ 600 dpi
# resolution="9933px*28086px" # A0x2 @ 300 dpi

sizes=( 0.5 0.6 0.45 )
resolution="14043px*19866px" # A0x2 @ 300 dpi 

for size in "${sizes[@]}"
do
  echo "$resolution @ $size"
  say "$resolution @ $size"
  
  phantomjs rasterize.js \
  "http://dev.free-idea.dcfvg.com/tools/by-size.php" \
  "$output/by-size-$size.jpg" \
  $resolution $size
  
done