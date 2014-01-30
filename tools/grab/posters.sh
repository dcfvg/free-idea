assets="../../assets"
cache="$assets/cache"
output="$assets/posters"

phantomjs rasterize.js \
"http://dev.free-idea.dcfvg.com/tools/repartition.php" \
"$output/repartition.pdf" \
A0 1 \
2>&1 | grep -v "userSpaceScaleFactor"

phantomjs rasterize.js \
"http://dev.free-idea.dcfvg.com/tools/by-size.php" \
"$output/by-size.pdf" \
A0 0.1 \
2>&1 | grep -v "userSpaceScaleFactor"