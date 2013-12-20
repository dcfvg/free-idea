$(function() {
  
  $( "img.draggable" ).draggable();
  
  function randomPlacement(){
    $('img.draggable').each(function(i,el){
      var tLeft = Math.floor(Math.random()*6000),
          tTop  = Math.floor(Math.random()*4000);
          $(el).css({position:'absolute', left: tLeft, top: tTop});
    });
  }
  function get_file(query){
    var posting = $.post(ajax_url, { query: query } );
    posting.done(function( data ) {
      $("#drawZone").prepend('<img class="draggable" src="'+data+'">');
      $("#drawZone").find('img:first-child()').css({position:'absolute', left: startMousePos.x, top: startMousePos.y}).draggable();
    });
  }
  
  var ajax_url = "call.php",
  currentMousePos = { x: -1, y: -1 },
  startMousePos = { x: -1, y: -1 },
  endMousePos = { x: -1, y: -1 },
  draw = false;

  $("#drawZone").mousedown(function(event){
    startMousePos.x = event.pageX;
    startMousePos.y = event.pageY;
  });
  $("#drawZone").mouseup(function(event){
    endMousePos.x = event.pageX;
    endMousePos.y = event.pageY;
    
    if (draw) {
      var size = { x: (endMousePos.x-startMousePos.x), y: (endMousePos.y-startMousePos.y) };
      console.log(size);
      get_file(size.x+"x"+size.y);
    }
  });
  randomPlacement();
  
  
  $( "body" ).keydown(function( event ) {
    if ( event.which == 32 ) {
      if(draw == false) draw = true;       
    }
  });
  $( "body" ).keyup(function( event ) {
    if ( event.which == 32 ) {
       draw = false;
    }
  });
});