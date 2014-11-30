#for step in `find /Users/benoit/Dropbox/scans-notes/recherche -iname "*.JPG" -type f`
for step in `find /Users/benoit/Dropbox/scans-notes/recherche -iname "*.JPG"  -exec ls -l {} \; | awk '{ print $5,"",$9 }'|sort -n`
do
	
	fscan=$(basename $step)
	scanid=${fscan%.*}

	cache="cache/"
	scandir="scan/"
	resultdir="result/"$scanid"/"
	
	if [ ! -d "$resultdir" ]; then
		
		if [[ -a $step ]]; then
			echo $step
			bash separate.sh $step
		fi
	else
		echo "skiping $step : result dir already exists"
	fi
done