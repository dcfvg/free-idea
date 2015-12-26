localDB=/Users/benoit/Scripts/custom/free-idea/sources/metro
rm -rf cache*

for step in `find ${1:-$localDB} -iname "*.JP*G" -exec ls -l {} \; | awk '{ print $5,"",$9 }'|sort -n`
do

	fscan=$(basename $step)
	scanid=${fscan%.*}

	originPath=$(dirname $1)
	collection=$(basename $1)

	resultdir="/Users/benoit/Scripts/custom/free-idea/sources/"$collection"-result/"$scanid"/"

	if [ ! -d "$resultdir" ]; then

		if [[ -a $step ]]; then
			echo $step
			bash separate.sh "$step"
			curl -L "http://localhost:3000/?f5=1"
		fi
	else
		echo "skiping $step : result dir already exists"
	fi
done
