<?php

$GLOBALS['clusterSize'] = 1;
$GLOBALS['maxTry'] = 1000;
$GLOBALS['cache'] = "content/cache/";

function sortBySize(){
	$p=0;

	ini_set('memory_limit', '-1');
	set_time_limit(6000);

	$cache = $GLOBALS['cache'];
	if(!file_exists($cache)) mkdir($cache);

	$files = glob("/Users/benoit/Scripts/custom/free-idea/sources/dessins-attente-result/wait-*/wait-*-*.png");
	foreach ($files as $id => $file) {

		$s = aproxSize(getimagesize($file));
		$d = $cache.'/'.$s[0]."x".$s[1];
		$newFile = $d.'/'.basename($file);

		if(!file_exists($d)) mkdir($d);
		if(!file_exists($newFile)){
			copy($file,$newFile);
			$p++;
		}
	}
	echo 'sort part by size :: '.count($files)." (+".$p.")";
	die();
}
function aproxSize($s){
	$s[0] = bzero(abs(round($s[0],-$GLOBALS['clusterSize'])));
	$s[1] = bzero(abs(round($s[1],-$GLOBALS['clusterSize'])));
	return $s;
}
function bzero($n){
	 return str_pad($n,4, "0", STR_PAD_LEFT);
}
function findNearestPart($s){
	$t = 0;
	$s = aproxSize($s);
	$step = pow(10,$GLOBALS['clusterSize']);
	$flip = true;

	while (!isset($parts[0]) and $t < $GLOBALS['maxTry']) {

		$res["querys"][] = $s[0]."x".$s[1];
		$flip = !$flip;

		if($flip) $s[0] = bzero(max(0,$s[0]-$step));
		else      $s[1] = bzero(max(0,$s[1]-$step));

		$exclude = array();
		//$exclude = array_unique(array_merge($_SESSION["blacklist"],$_SESSION["history"])); # double detection
		$exclude = $_SESSION["history"]; # double detection

		$parts = array_diff(glob($GLOBALS['cache'].$s[0]."x".$s[1]."/*.png"), $exclude);

		$t++;
	}

	if($t >= $GLOBALS['maxTry']){
		if(empty($parts)){
			$parts = glob($GLOBALS['cache'].$s[0]."x*/*.png");
			$t++;
			$res["querys"][] = "all-w";
		};
		if(empty($parts)){
			$parts = glob($GLOBALS['cache']."*x".$s[1]."/*.png");
			$t++;
			$res["querys"][] = "all-h";
		};
		if(empty($parts)){
			$parts = glob($GLOBALS['cache']."*x*/*.png");
			$t++;
			$res["querys"][] = "all-a";
		};
	}

	shuffle($parts);

	$res["result"] = $parts[0];
	$res["trys"] = $t;

	return $res;
}
function array_not_unique($raw_array){

		// looking for duplicate element in array

		$dupes = array();
		natcasesort($raw_array);
		reset ($raw_array);

		$old_key    = NULL;
		$old_value    = NULL;
		foreach ($raw_array as $key => $value) {
				if ($value === NULL) { continue; }
				if ($old_value == $value) {
						$dupes[$old_key]    = $old_value;
						$dupes[$key]        = $value;
				}
				$old_value    = $value;
				$old_key    = $key;
		}
	return $dupes;
}
function pxTocm($s){
 	$cons = 5.905628064;

	$s[0] = round($s[0]/$cons);
 	$s[1] = round($s[1]/$cons);

 return $s[0]." × ".$s[1]." mm";
}
function getclosetratio(){
	// from http://stackoverflow.com/questions/928247/sorting-and-displaying-image-based-on-size
	$record_ratio = 0;
	foreach (glob("*.jpg") as $filename) {
			$info = getimagesize($filename);
			$ratio = $info[0] / $info[1];
			if (abs(1 - $ratio) < abs(1 - $record_ratio)) {
				$record_ratio = $ratio;
				$record_filename = $filename;
			}
			if (record_ratio == 1) break;
	}
	if ($record_ratio > 0) {
		echo '<img src="'.$record_filename.'" height=150px><br>';
	}
}
function listShapes($w, $h){

	global $step, $cache, $limit;

	$s = bzero($w * $step)."x".bzero($h * $step);

	$tmp = glob($cache.'/'.$s.'/*.png');
	//array_splice($tmp, $limit);

	return $tmp;
}

?>
