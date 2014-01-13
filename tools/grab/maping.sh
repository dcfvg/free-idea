assets="../../assets"
cache="$assets/cache"
output="$assets/posters"

phantomjs rasterize.js \
"http://dev.free-idea.dcfvg.com/tools/repartition.php" \
"$output/map.pdf" \
A0 1 \
2>&1 | grep -v "userSpaceScaleFactor"