<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>free ideas</title>
  <link rel="stylesheet" href="css/jquery-ui.css">
  <script src="js/jquery-1.9.1.js"></script>
  <script src="js/jquery-ui.js"></script>
  <style>
    /*.draggable { width: 150px; height: 150px; padding: 0.5em; }
    body {background:url('fd.png');}*/
  </style>
  <script>
    $(function() {
      $( ".draggable" ).draggable();
  	  $('img.draggable').each(function(i,el){
  	    var tLeft = Math.floor(Math.random()*6000),
  	        tTop  = Math.floor(Math.random()*4000);
  	        $(el).css({position:'absolute', left: tLeft, top: tTop});
  	  });
    });
  </script>
</head>
<body>
	<?php 
	  $files = glob("assets/transparent/IMG_*/*.png");
	  shuffle ($files);
	  
	  foreach ($files as $id => $file) {
	    $size = getimagesize($file);
	    if($size[0]*$size[1] < 100*100)unset($files[$id]);
	    if($size[0]*$size[1] > 2000*2000)unset($files[$id]);
	    
	  }
	  
	  $files = array_slice($files,0,100);
	  
	  foreach ($files as $id_file => $file) echo '<img class="draggable" src="'.$file.'">';
	?>
</body>
</html>