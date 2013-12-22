<?php
function sortBySize(){
  
  
  ini_set('memory_limit', '-1');
  set_time_limit(6000);
  
  
  //$start = "";
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
function getClosest($search, $arr) {
   $closest = null;
   foreach($arr as $item) {
      if($closest == null || abs($search - $closest) > abs($item - $search)) {
         $closest = $item;
      }
   }
   return $closest;
}
?>