<?php
  
  include("function.php");
  
  if(isset($_GET['f5'])) sortBySize();

  session_start();
  unset($_SESSION["history"]);
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
  	<div id="drawZone"></div>
  	<video id="videoID" width="100%" height="100%">
    	<source src="replay.mov" type="video/mp4" />
    	Your browser does not support HTML5 video.
    </video>
  	<script src="js/jquery-1.9.1.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/free.js"></script>
  </body>
</html>