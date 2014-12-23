assets="../../content"
cache="$assets/cache"
output="$assets/posters"


printf "|-------------------------------------------------|\n"

limit=100000
h_max=400
w_max=400
clusterLimit=3000000

phantomjs rasterize_pdf.js \
"http://dev.free-idea.dcfvg.com/tools/by-size.php?h_max="$h_max"&w_max="$w_max"&limit="$limit"&clusterLimit="$clusterLimit \
"$output/book_"$h_max"x"$w_max"_"$clusterLimit"-"$limit".pdf" \
"13cm*20cm" 0.3