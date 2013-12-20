<?php

include("function.php");

//print_r($_POST["query"]);
//$q = json_decode($_POST["query"]);

$size = $_POST["query"];
$size = explode("x",$size);

$parts = glob("assets/cache/".aproxSize($size)."/*.png");

shuffle ($parts);
if($parts[0] !="") echo $parts[0];
else $parts = glob("assets/cache/".aproxSize($size)."/*.png");

?>