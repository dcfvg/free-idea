$(function() {
  
  $( ".draggable" ).draggable();
  
  function randomPlacement(){
    $('img.draggable').each(function(i,el){
      var tLeft = Math.floor(Math.random()*6000),
          tTop  = Math.floor(Math.random()*4000);
          $(el).css({position:'absolute', left: tLeft, top: tTop});
    });
  }
  function get_file(size){
    var posting = $.post(ajax_url, { size: size } );
    posting.done(function( data ) {
      console.log(data);
    });
  }
  
  
  var ajax_url = "call.php",
  currentMousePos = { x: -1, y: -1 },
  startMousePos = { x: -1, y: -1 },
  endMousePos = { x: -1, y: -1 };

  
  $("#drawZone").mousedown(function(event){
    startMousePos.x = event.pageX;
    startMousePos.y = event.pageY;
  });
  $("#drawZone").mouseup(function(event){
    endMousePos.x = event.pageX;
    endMousePos.y = event.pageY;
    
    var size = { x: (endMousePos.x-startMousePos.x), y: (endMousePos.y-startMousePos.y) },
    
  
    
    console.log(size.x+"x"+size.y);
  });
  
  

  get_file("200x100");
});