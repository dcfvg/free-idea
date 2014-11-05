<?php

$blacklist_cache = "content/cache.dat";

session_start();
if(!isset($_SESSION["history"])) $_SESSION["history"][] = 0; 
if(!isset($_SESSION["blacklist"])) $_SESSION["blacklist"] = unserialize(file_get_contents($blacklist_cache));; 

include("function.php");

if(isset($_POST["query"])) {
  $size = $_POST["query"];
  //$size = "1356x1268";
  
  $size = explode("x",$size);
  $find = findNearestPart($size);
  
  $part = $find["result"];
  
  $_SESSION["history"][] = $part;

  // $result["history"] = $_SESSION["history"];
  $result["part"] = $part;
  $result["duplicate"] = array_not_unique($_SESSION["history"]);
  $result["trys"] = $find["trys"];
  $result["querys"] = $find["querys"];
  
}
if(isset($_POST["blacklist"])){
  $_SESSION["blacklist"][] = $_POST["blacklist"];

  $_SESSION["blacklist"] = array_merge(array_unique($_SESSION["blacklist"]));
  file_put_contents($blacklist_cache, serialize($_SESSION["blacklist"]));
  
  $result["blacklist"] = $_SESSION["blacklist"];
}

echo json_encode($result);
?>