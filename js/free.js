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
          .draggable({disabled: true})
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
  function init (){}
  
  function screensaver() {
    $("#videoID").get(0).play();
    
    var LowerRange=100,
    UpperRange=400;
    
    document.getElementById("videoID").currentTime = Math.floor(Math.random() * (UpperRange - LowerRange + 1)) + LowerRange;;
    
    $("#videoID").show();
  }
  
  var 
  ajax_url = "call.php",
  currentMousePos = { x: -1, y: -1 },
  startMousePos = { x: -1, y: -1 },
  endMousePos = { x: -1, y: -1 },
  draw = true,
  $paper = $("#drawZone");
  
  $("body").mousemove(function( event ){
    $("#videoID").hide();
    screensavertimer = setTimeout(screensaver, 5000);
  })
  // set events
  
  $paper // mouse
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
  })
  .mouseup(function(event){
    endMousePos.x = event.pageX;
    endMousePos.y = event.pageY;
    
    if (draw) get_file((endMousePos.x-startMousePos.x)+"x"+(endMousePos.y-startMousePos.y) );
    $("#select").remove();
  });
  
  $("html") // keypress
  .keydown(function( event ){
    //if ( event.which == 32 ) if(draw == false) draw = true; // toogle draw mode
  })
  .keyup(function( event ){
    //if ( event.which == 32 ) draw = false; // toogle draw mode
  })
  .keypress(function( event ){
    //console.log(event.which);
    if ( event.which == 114 ) removeLastPart();                           // r
    if ( event.which == 113 ) {
    
      startMousePos.x = currentMousePos.x;
      startMousePos.y = currentMousePos.y;
      get_file((endMousePos.x-startMousePos.x)+"x"+(endMousePos.y-startMousePos.y) );                       //
    
    }
    if ( event.which == 98 ) {
      addToBlackList($paper.find('img:last-child()').attr("src"));
      removeLastPart();
    }
  });



  
});