<?php
ini_set('memory_limit', '-1');
set_time_limit(6000);

$cache = "../assets/cache/";
include("../function.php");


$step = pow(10,$GLOBALS['clusterSize']);

for ($h=0; $h < 150; $h++) {
    for ($w=0; $w < 150; $w++) {
    $s = bzero($w * $step)."x".bzero($h * $step);
    //echo "<li>$s</li>";
    $res = array_merge((array)$res, glob($cache.'/'.$s.'/IMG_*'));
  }
}

$res = array_unique($res);
//array_splice($res, 35000);

foreach ($res as $id => $img) $tab .= '<img src="'.$img.'">';
?>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="../css/style.css">
  </head>
  <body id="poster">
    <?php echo $tab ?>
  </body>
</html>

