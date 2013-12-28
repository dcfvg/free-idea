<?php
function sortBySize(){
  
  ini_set('memory_limit', '-1');
  set_time_limit(6000);
  
  $cache = "assets/cache";
  if(!file_exists($cache)) mkdir($cache);
  
  $files = glob("assets/separate-result/IMG_*/*.png");
  
  foreach ($files as $id => $file) {
    $s = getimagesize($file);
    $d = $cache.'/'.aproxSize($s);
    
    if(!file_exists($d)) mkdir($d);
    
    $newFile = $d.'/'.basename($file);
    
    if(!file_exists($newFile)){
      copy($file,$newFile);
       $p++;
    }
  } 
  echo $p;
}
function aproxSize($s){
  return abs(round($s[0],-2)).'x'.abs(round($s[1],-2));
}
function findNearestPart($size){
  $s = $size;
  while (is_null($parts[0])) {
    if($t%2 > 0 ) {
      $s[0] = $size[0]-($try*100);
    } else {
      $s[1] = $size[1]-($try*100);
      $try++;
    }
    $parts = array_diff(glob("assets/cache/".aproxSize($s)."/*.png"),$_SESSION["history"]);
    $t++;
  }
  shuffle ($parts);
  return $parts[0];
}
function findPart($size){
  
  $parts = glob("assets/cache/".aproxSize($size)."/*.png");

  // if(is_null($parts[0])) $parts = glob("assets/cache/*x*/*.png"); // get full random if no result
  
  shuffle ($parts);
  return $parts[0];
}
function getClosest($search, $arr){
   $closest = null;
   foreach($arr as $item) {
      if($closest == null || abs($search - $closest) > abs($item - $search)) {
         $closest = $item;
      }
   }
   return $closest;
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
?>