<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>free ideas</title>
  <link rel="stylesheet" href="css/jquery-ui.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body id="drawZone">
  <?php  
    // $files = glob("assets/separate-result/IMG_*/*.png");
    //     shuffle ($files);
    //     
    //     foreach ($files as $id => $file) {
    //       $size = getimagesize($file);
    //       if($size[0]*$size[1] < 200*200)unset($files[$id]);
    //       if($size[0]*$size[1] > 2000*2000)unset($files[$id]); 
    //     }
    //     $files = array_slice($files,0,1);
    //     
    //     foreach ($files as $id_file => $file) echo '<img class="draggable" src="'.$file.'">';
  
  include("function.php");
  //if(isset($_GET['f5'])) sortBySize();
  
  ?>
	
	<script src="js/jquery-1.9.1.js"></script>
  <script src="js/jquery-ui.js"></script>
  <script src="js/free.js"></script>
</body>
</html>