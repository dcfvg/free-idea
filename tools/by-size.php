<?php
$cache = "../assets/cache/";
include("../function.php");


$step = pow(10,$GLOBALS['clusterSize']);

for ($h=0; $h < 300; $h++) {
    for ($w=0; $w < 300; $w++) {
    $s = bzero($w * $step)."x".bzero($h * $step);
    //echo "<li>$s</li>";
    $res = array_merge((array)$res, glob($cache.'/'.$s.'/IMG_*'));
  }
}

array_splice($res, 30000);
foreach ($res as $id => $img) {
  $tab .= '<img src="'.$img.'">';
}
?>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="../css/style.css">
  </head>
  <body id="poster">
    <p class="size"><?php echo ltrim($size[0],"0")." × ".ltrim($size[1],"0")."px @150dpi ≅ ".pxTocm($size)."" ?></p>
    <?php echo $tab ?>
    <script src="../js/jquery-1.9.1.js"></script>
  </body>
</html>

