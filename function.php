<?php
function sortBySize(){
  
  ini_set('memory_limit', '-1');
  set_time_limit(6000);
  
  $cache = "assets/cache";
  if(!file_exists($cache)) mkdir($cache);
  
  $files = glob("assets/separate-result/IMG_*/*.png");
  
  foreach ($files as $id => $file) {

    $s = aproxSize(getimagesize($file));
    $d = $cache.'/'.$s[0]."x".$s[1];
    
    if(!file_exists($d)) mkdir($d);
    
    $newFile = $d.'/'.basename($file);
    
    if(!file_exists($newFile)){
      copy($file,$newFile);
       $p++;
    }
  }
  echo '<h1 id="f5">'.count($files)." (+".$p.")         <h1>";
}
function aproxSize($s){
  $s[0] = abs(round($s[0],-2));
  $s[1] = abs(round($s[1],-2));
  return $s;
}
function findNearestPart($s){
  $t = 0;
  $s = aproxSize($s);
  
  while (is_null($parts[0]) and $t < 100) {
    
    $res["querys"][] = $s[0]."x".$s[1];
    $flip = !$flip;
    
    if($flip) $s[0] = max(0,$s[0]-100);
    else      $s[1] = max(0,$s[1]-100);
    
    $exclude = array_unique(array_merge($_SESSION["blacklist"],$_SESSION["history"]));
    $parts = array_diff(glob("assets/cache/".$s[0]."x".$s[1]."/*.png"),$exclude);
    
    $t++;
  }
  shuffle ($parts);
  
  $res["result"] = $parts[0];
  $res["trys"] = $t;
  
  return $res;
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