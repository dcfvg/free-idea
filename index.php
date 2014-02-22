<?php
  
  include("function.php");
  session_start();
  
  if(isset($_GET['f5'])) sortBySize();
  if(isset($_GET['reset'])) unset($_SESSION["history"]);
  
  // print_r($_SESSION["history"]);
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>free ideas</title>
    <link rel="stylesheet" href="css/jquery-ui.css">
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body id="mainApp">
  	<video class="isight" id="my_camera" autoplay="autoplay"></video>
    <div id="drawZone"></div>
  	<script src="js/jquery-1.9.1.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/free.js"></script>
  </body>
</html>