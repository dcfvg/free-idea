<?php
$cache = "../assets/cache/";
include("../function.php");


if(isset($_GET["s"])){
  $s = $_GET["s"];
  
  $res = glob($cache.'/'.$s.'/IMG_*');
  // shuffle($res);
  
  array_splice($res, 50000);
  foreach ($res as $id => $img) {
    $tab .= '<img src="'.$img.'">';
  }
  
  $size = explode("x",$s);  
}

function pxTocm($s){
 
 $cons = 5.905628064;
 
 $s[0] = round($s[0]/$cons);
 $s[1] = round($s[1]/$cons);

 return $s[0]." × ".$s[1]." mm";
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
    <p class="size">
      <?php echo count($res) ?>
    </p>
    <script src="../js/jquery-1.9.1.js"></script>
  </body>
</html>

