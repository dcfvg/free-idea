<?php
include("../function.php");
$cache = "../content/cache/";

$total = count(glob($cache.'/*x*/IMG_*'));

$step = pow(10,$GLOBALS['clusterSize']);
$maxsize = 2500;
for ($c=-1; $c < $maxsize/$step; $c++) {
  $tab .= '<tr>';
  for ($l=-1; $l < $maxsize/$step; $l++) {
    if($l < 0) $tab .= '<th>'.($c*$step).'</th>';
    else if($c < 0) $tab .= '<th>'.($l*$step).'</th>';
    else {
      $nb = count(glob($cache.'/'.bzero(($c*$step)).'x'.bzero(($l*$step)).'/IMG_*'));
      $color = 255-round(($nb/$total)*20000);
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
    <link rel="stylesheet" href="../assets/css/screen.css">
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
    <script src="../assets/js/all.min.js"></script>
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

          var follower = $("#demo");
          var xp = 20, yp = 20;
          var loop = setInterval(function(){
              xp += (mouseX - xp) / 2;
              yp += (mouseY - yp) / 2;
              follower.css({left:xp, top:yp});
          }, 40);
      });
    </script>
  </body>
</html>

