for step in `find /Users/benoit/Dropbox/scans-notes/recherche -iname "*.JPG" -type f`
do
	echo $step
	bash separate.sh $step
  
done