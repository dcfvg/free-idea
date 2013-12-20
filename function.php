<?php
function sortBySize(){
  
  $cache = "assets/cache";
  if(!file_exists($cache)) mkdir($cache);
  
  $files = glob("assets/transparent/IMG_*/*.png");
  
  foreach ($files as $id => $file) {
    $s = getimagesize($file);
    $d = $cache.'/'.aproxSize($s);
    
    if(!file_exists($d)) mkdir($d);
    copy($file, $d.'/'.basename($file));
  } 
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