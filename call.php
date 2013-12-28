<?php

session_start();

include("function.php");
if(!isset($_SESSION["history"])) $_SESSION["history"][] = 0; 

$size = $_POST["query"];
//$size = "1000x1000";
$size = explode("x",$size);

$part = findNearestPart($size);
$_SESSION["history"][] = $part;

$result["part"] = $part;
// $result["history"] = $_SESSION["history"];
$result["duplicate"] = array_not_unique($_SESSION["history"]);

echo json_encode($result);
?>