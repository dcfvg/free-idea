startTime=$(date +"%m-%d-%Y_%k-%M-%S")

assets="../../assets"
cache="$assets/cache"
output="$assets/posters/$startTime"

# phantomjs rasterize.js \
# "http://dev.free-idea.dcfvg.com/tools/repartition.php" \
# "$output/repartition.pdf" \
# A0 1 \
# 2>&1 | grep -v "userSpaceScaleFactor"

# sizes=( 0.5 0.45 0.40 0.35 0.30 0.25)
# resolution="19866px*56174px" # A0x2 @ 600 dpi
# resolution="9933px*28086px" # A0x2 @ 300 dpi

sizes=( 0.7 0.5 0.6 )
wmaxs=( 5 20 40 )
limits=( 1 100 1000 5000 )
# resolution="14043px*19866px" # A0x2 @ 300 dpi 

#resolution="3898px*50000px"  # Multitude Doubles
resolution="4016px*22320px"  # Multitude 8 pages, fond perdus
#resolution="14173px*20787px" # 120x176 @ 300 dpi

for size in "${sizes[@]}"
do
  for wmax in "${wmaxs[@]}"
	do
		for limit in "${limits[@]}"
		do
			message="$resolution @ $size :: wmax = $wmax :: limit = $limit"
		  
		  echo 	$message
		  say 	$message

		  phantomjs rasterize.js \
		  "http://dev.free-idea.dcfvg.com/tools/by-size.php?w_max=$wmax&limit=$limit" \
		  "$output/$size-$resolution-wmax-$wmax-limit-$limit" \
		  $resolution $size
	  done
  done
done