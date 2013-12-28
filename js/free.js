$(function() {
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
      data = JSON.parse(data);      
      $paper
        .append('<img class="draggable" src="'+data.part+'">')
        .find('img:last-child()')
        .css({position:'absolute', left: startMousePos.x, top: startMousePos.y})
        .draggable({disabled: true})
        .draggable('enable');
    });
  }
  function addSelectionZone(){
    $("#select").remove();
    $paper.append('<div id="select"></div>'); // create selection zone
    $("#select").css({position:'absolute', left: startMousePos.x, top: startMousePos.y})
  }
  
  var 
  ajax_url = "call.php",
  startMousePos = { x: -1, y: -1 },
  endMousePos = { x: -1, y: -1 },
  draw = false,
  $paper = $("#drawZone");
  
  $paper // mouse event
  .mousedown(function(event){
    startMousePos.x = event.pageX;
    startMousePos.y = event.pageY;
    
    if (draw) addSelectionZone();
  })
  .mousemove(function( event ){
    if (draw) $("#select").css({position:'absolute', width: (event.pageX - startMousePos.x), height: (event.pageY - startMousePos.y)});
    // get_file((event.pageX)+"x"+(event.pageY)); // test only
  })
  .mouseup(function(event){
    endMousePos.x = event.pageX;
    endMousePos.y = event.pageY;
    
    if (draw) get_file((endMousePos.x-startMousePos.x)+"x"+(endMousePos.y-startMousePos.y) );
    $("#select").remove();
  });
  
  $("html") // shortcut
  .keydown(function( event ){
    if ( event.which == 32 ) if(draw == false) draw = true; // toogle draw mode
  })
  .keyup(function( event ) {
    if ( event.which == 32 ) draw = false; // toogle draw mode
  })
  .keypress(function( event ) {
    if ( event.which == 114 ) $paper.find('img:first-child()').remove(); // remove last part
  });
});