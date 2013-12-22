<?php

include("function.php");
$size = $_POST["query"];
$size = explode("x",$size);
echo findNearestPart($size);

?>