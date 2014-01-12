<?php
$cache = "../assets/cache/";
include("../function.php");
$total = count(glob($cache.'/*x*/IMG_*'));
for ($c=0; $c < 45; $c++) {
  $tab .= '<tr>';
  for ($l=0; $l < 45; $l++) {
    if($l == 0) $tab .= '<th>'.($c*100).'</th>';
    else if($c == 0) $tab .= '<th>'.($l*100).'</th>';
    else {
      $nb = count(glob($cache.'/'.($c*100).'x'.($l*100).'/IMG_*'));
      $color = 255-round(($nb/$total)*10000);
      $color2 = 0;
      if($nb == 0) {
       $color = 0;
       $color2 = 255; 
      }
      $tab .= '<td style="background:rgb('.$color2.',255,'.$color.');">'.$nb.'</td>';
    } 
  }
  $tab .= '</tr>';
}
?>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="../css/style.css">
  </head>
  <body id="graph">
    <div id="demo">
      <p></p>
    </div>
    <table cellspacing="0" cellpadding="0"> 
      <tbody>
        <?php echo $tab ?>
      </tbody>
    </table>
    <script src="../js/jquery-1.9.1.js"></script>
    <script>
    $(function() {
        $("table").delegate('td','mouseover mouseleave', function(e) {
            if (e.type == 'mouseover') {
              $(this).parent().find("th").addClass("hover");
              $("tbody th:nth-child(" + ($(this).index()+1) + ")").addClass("hover");
              
              var w = $("tbody th:nth-child(" + ($(this).index()+1) + ") ").first().text(); 
              var h = $(this).parent().find("th").text() ;
              
              // move demo square and update size information
              $("#demo").height(h/50).width(w/50);
              $("#demo p").html(h + " x "+w+"px");
              
            } else {
              $(this).parent().find("th").removeClass("hover");
              $("tbody th:nth-child(" + ($(this).index()+1) + ")").removeClass("hover");
            }
        });
        
        var mouseX = 0, mouseY = 0, limitX = 150000-15, limitY = 150000-15;
        $(window).mousemove(function(e){
           mouseX = Math.min(e.pageX, limitX) + 30;
           mouseY = Math.min(e.pageY, limitY) + 30;
        });

        // cache the selector
        var follower = $("#demo");
        var xp = 20, yp = 20;
        var loop = setInterval(function(){
            // change 12 to alter damping higher is slower
            xp += (mouseX - xp) / 2;
            yp += (mouseY - yp) / 2;
            follower.css({left:xp, top:yp});

        }, 40);
    });

    </script>
  </body>
</html>

