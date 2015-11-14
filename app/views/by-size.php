<?php

// All parts sorted by size

ini_set('memory_limit', '-1');
set_time_limit(60000);
error_reporting(E_ALL & ~E_NOTICE);

include("../function.php");

$cache = "../content/cache/";
$step = pow(10,$GLOBALS['clusterSize']);

$h_max = $_GET['h_max'] ?: 15;
$h_min = 0;

$w_max = $_GET['w_max'] ?: 30;
$w_min = 0;

$limit = $_GET['limit'] ?: 500;

for ($h=$h_min; $h < $h_max; $h++) {
  if($h % 2 == 0) for ($w=$w_max; $w > $w_min; $w--) $res = array_merge((array)$res, listShapes($w, $h));
  else            for ($w=$w_min; $w < $w_max; $w++) $res = array_merge((array)$res, listShapes($w, $h));
}

$res = array_unique($res);
array_splice($res, $limit);

foreach ($res as $id => $img) $tab .= '<img src="'.$img.'">';

?>
<html>
  <head>
    <meta charset="utf-8">
    <style type="text/css">
      * { margin: 0; padding: 0;}
      #poster { margin: 0 3% 0 5%}
    </style>
  </head>
  <!-- items : <?php echo count($res); ?> -->

  <body id="poster">
    <?php echo $tab ?>
  </body>
</html>
