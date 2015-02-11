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
    <link rel="stylesheet" href="css/screen.css">
  </head>
  <body id="mainApp">
  	<div id="message">
      <h1>freeidea</h1>
      1 — <strong>Maintenir</strong> la barre d'espace <br>
      2 — Délimiter une <strong>zone</strong> par glisser déplacer <br>
      3 — <strong>Relacher</strong> la barre d'espace <br>
      4 — <strong>Glisser déplacer</strong> les morceaux d'image  <br>
    </div>
    <video class="isight" id="my_camera" autoplay="autoplay"></video>
    <div id="drawZone"></div>
  	<script src="js/jquery-1.9.1.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/free.js"></script>
  </body>
</html>