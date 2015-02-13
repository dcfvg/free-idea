localDB=/Users/benoit/Dropbox/scans-notes/conference
rm -rf cache*

for step in `find ${1:-$localDB} -iname "*.JP*G" ## -exec ls -l {} \; | awk '{ print $5,"",$9 }'|sort -n`
do
	
	fscan=$(basename $step)
	scanid=${fscan%.*}
	resultdir="../../sources/separate-result/"$scanid"/"

	if [ ! -d "$resultdir" ]; then
		
		if [[ -a $step ]]; then
			echo $step
			bash separate.sh "$step"

			curl -L "http://dev.free-idea.dcfvg.com/?f5=1"

		fi
	#else
		#echo "skiping $step : result dir already exists"
	fi
done