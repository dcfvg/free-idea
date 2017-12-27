if [[ $# -eq 0 ]] ; then
    echo 'no argument'
    exit 1
fi

localDB=$1
rm -rf cache*

for step in `find ${1:-$localDB} -iname "*.JP*G" -exec ls -l {} \; | awk '{ print $5,"",$9 }'|sort -n`
do

	fscan=$(basename $step)
	scanid=${fscan%.*}

	originPath=$(dirname $1)
	collection=$(basename $1)

	resultdir="../../_fragments/"$collection"-result/"$scanid"/"

	if [ ! -d "$resultdir" ]; then

		if [[ -a $step ]]; then
			echo $step
			bash separate.sh "$step"
		fi
	else
		echo "skiping $step : result dir already exists"
	fi
done
