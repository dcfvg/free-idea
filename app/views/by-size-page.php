<?php

//
// generate page from the all parts book
//


error_reporting(E_ALL & ~E_NOTICE);

include("../function.php");
$cache = '../content/cache/';

if(isset($_GET["s"])){
  $s = $_GET["s"];

  $res = glob($cache.'/'.$s.'/IMG_*');
  // shuffle($res);

  //array_splice($res, 50000);
  foreach ($res as $id => $img) {
    $tab .= '<img src="'.$img.'">';
  }

  $size = explode("x",$s);
}
?>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="../assets/css/screen.css">
  </head>
  <body id="poster">
    <p class="size"><?php echo ltrim($size[0],"0")." × ".ltrim($size[1],"0")."px @150dpi ≅ ".pxTocm($size)."" ?></p>
    <?php echo $tab ?>
    <p class="size">
      <?php echo count($res) ?>
    </p>
    <script src="../assets/js/all.min.js"></script>
  </body>
</html>

