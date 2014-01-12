<?php

$blacklist_cache = "../assets/cache.dat";

session_start();
if(!isset($_SESSION["history"])) $_SESSION["history"][] = 0; 
//if(!isset($_SESSION["blacklist"])) $_SESSION["blacklist"] = unserialize(file_get_contents($blacklist_cache));; 

if(isset($_GET["del"])){
  
  echo array_search($_GET["del"], $_SESSION["blacklist"]);
  unset($_SESSION["blacklist"][array_search($_GET["del"], $_SESSION["blacklist"] )]);
  file_put_contents($blacklist_cache, serialize($_SESSION["blacklist"]));
}

include("../function.php");

foreach ($_SESSION["blacklist"] as $id => $path) {
  $list .=  '<li><a href="?del='.$path.'">x</a><img src="../'.$path.'"></li>';
}

?>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="../css/style.css">
  </head>
  <body id="blacklist">
    <ul>
      <?php echo $list ?>
    </ul>
  </body>
</html>

