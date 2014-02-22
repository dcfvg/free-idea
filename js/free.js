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
      if(data.part){
        $paper
          .append('<img class="draggable" src="'+data.part+'">')
          .find('img:last-child()')
          .css({position:'absolute', left: startMousePos.x, top: startMousePos.y})
          .draggable({disabled: true, start: function(event, ui) { $(this).css("z-index", z++); }})
          .draggable('enable');
      }else{
        console.log("no result");
      }
      console.log(data);
    });
  }
  function removeLastPart(){
    $paper.find('img:last-child()').remove()
  }
  function addToBlackList(file){
    var posting = $.post(ajax_url, { blacklist: file } );
    posting.done(function( data ) {
      data = JSON.parse(data);
      console.log(data);
    });
  }
  function addSelectionZone(){
    $("#select").remove();
    $paper.append('<div id="select"></div>'); // create selection zone
    $("#select").css({position:'absolute', left: startMousePos.x, top: startMousePos.y})
  }
  function init(){
   init_camera();
  }
  function init_camera(){
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		
		window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

		if (navigator.getUserMedia && window.URL) {
			var video = document.getElementById('my_camera');

			navigator.getUserMedia({
				"audio": false,
				"video": { "mandatory": { "minWidth": vid_h, "minHeight": vid_h } }
			},
			function(stream) { // got access, attach stream to video
				video.src = window.URL.createObjectURL( stream ) || stream;
			});
		}
		else {
			alert("getUserMedia not supported on your machine!");
		}
  }
  
  var 
  ajax_url = "call.php",
  currentMousePos = { x: -1, y: -1 },
  startMousePos = { x: -1, y: -1 },
  endMousePos = { x: -1, y: -1 },
  z = 100, moves = 0, moves_max = 8,
  draw = false,
  draw_dot = false,
  draw_around = false,
  $paper = $("#drawZone"),
  $video = $( "#my_camera" ), vid_h=1080,vid_w=1920;
  
  // init 
  
  init();
  
  // set events
  
  $(document) // mouse
  .mousedown(function(event){
    startMousePos.x = event.pageX;
    startMousePos.y = event.pageY;
    
    if (draw) addSelectionZone();
  })
  .mousemove(function( event ){
    if (draw) $("#select").css({position:'absolute', width: (event.pageX - startMousePos.x), height: (event.pageY - startMousePos.y)});
    // get_file((event.pageX)+"x"+(event.pageY)); // test only
    currentMousePos.x = event.pageX;
    currentMousePos.y = event.pageY;
    moves++;
    if(draw_dot && draw && moves > moves_max){
      startMousePos.x = currentMousePos.x;
      startMousePos.y = currentMousePos.y;
      get_file("100x100");
      moves = 0;
    }
    if(draw_around && draw && moves > moves_max){
      startMousePos.x = currentMousePos.x;
      startMousePos.y = currentMousePos.y;
      get_file((endMousePos.x-startMousePos.x)+"x"+(endMousePos.y-startMousePos.y) );
      moves = 0;
    }
  })
  .mouseup(function(event){
    endMousePos.x = event.pageX;
    endMousePos.y = event.pageY;
    
    if (draw) get_file((endMousePos.x-startMousePos.x)+"x"+(endMousePos.y-startMousePos.y) );
    $("#select").remove();
  })
  .keydown(function( event ){
    if ( event.which == 32 ) if(draw == false) draw = true; // toogle draw mode
  })
  .keyup(function( event ){
    if ( event.which == 32 ) {
      draw = false; // toogle draw mode
      draw_dot = false;
      draw_around = false;
    }
  })
  .keypress(function( event ){
    //console.log(event.which);
    
    // r -> rm last part
    if ( event.which == 114 ) removeLastPart(); 
    // s -> change last part
    if ( event.which == 115 ) {
      removeLastPart();
      get_file((endMousePos.x-startMousePos.x)+"x"+(endMousePos.y-startMousePos.y) );
    }
    // d -> draw with dot 
    if ( event.which == 100 ) {
      draw_dot = !draw_dot;
      //console.log("draw_dot:"+draw_dot);
    }
    // e -> eraser
    if ( event.which == 101 ) $paper.empty();
    // q -> add element around the same point
    if ( event.which == 113 ) 
    {
      draw_around = !draw_around;
    }
    // b -> add to black list
    if ( event.which == 98 ) {
      addToBlackList($paper.find('img:last-child()').attr("src"));
      removeLastPart();
    }
  });
});