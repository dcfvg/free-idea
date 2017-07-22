$(function() {

  // search in cluster array (grid) the nearest result
  function search(size){

    var q = _.map(size, function(d){ return Math.ceil(d / 10) * 10;});
    var result = _(grid).filter({'w':q[0], 'h':q[1]}).value();

    if(result.length){
      appendResult(result[0]);
      searchTry=0;
    }else if(searchTry < 100){
      // try a new search
      searchTry++;
      var newSize = [ Math.abs(size[0]) - 10, Math.abs(size[1] + 10)];
      search(newSize);
    }else{
      // get random part
      appendResult(_(grid).shuffle().first());
    }
  }

  function pickPart(cluster){

    var pos = 0, id = 'p';
    pos = _.random(0,cluster.c - 1);
    id  = "res"+cluster.w+'-'+cluster.h+'-'+pos;
    var src = conf.publicCache+cluster.w+'x'+cluster.h+'/'+pos+'.png';

    return { src:src,id:id }
  }
  // choose in results and add draw it
  function appendResult(cluster){

    var p = pickPart(cluster);

    $paper
      .append('<img class="draggable" id="'+p.id+'" src="'+p.src+'">')
      .find('img:last-child()')
      .css({position:'absolute', left: startMousePos.x, top: startMousePos.y})
      .draggable({disabled: true, start: function(event, ui) {
          $(this).css("z-index", z++);
          lastSelected = $(this).attr("id");
        }
      })
      .draggable('enable');
      $("#message").addClass("hide");
      lastSelected = p.id;
  }

  // fill with random elements
  function randomDrawing(settings){

    var s = _.defaults(settings,{
          maxHeight:200,
          maxWidth:200,
          minHeight:10,
          minWidth:10,
          elements:100,
          elementsPerLocation:2
        })

    for (var i = s.elements/s.elementsPerLocation; i >= 0; i--) {
      console.log(i);


      var resWidth = _.random(s.minWidth, s.maxWidth),
          resHeight = _.random(s.minWidth, s.maxHeight);

      startMousePos.x = _.random(0, $( window ).width()-resWidth )
      startMousePos.y = _.random(0, $( window ).height()-resHeight )

      for (var j = s.elementsPerLocation; j >= 0; j--) search([resWidth,resHeight])

    };
    console.log(s);
  }

  // create selection zone
  function appendSelectionZone(){
    $("#select").remove();
    $paper.append('<div id="select"></div>'); // create selection zone
    $("#select").css({position:'absolute', left: startMousePos.x, top: startMousePos.y})
  }

  // UI FUNCTIONS
  function onMouseMove( e ){
    if (draw){
      $("#select").css({
        position:'absolute',
        width: (e.pageX - startMousePos.x),
        height: (e.pageY - startMousePos.y)
      });
    }

    // search([e.pageX,e.pageY]); // test only
    currentMousePos.x = e.pageX;
    currentMousePos.y = e.pageY;
    moves++;

    if(draw_dot && draw && moves > moves_max){
      startMousePos.x = currentMousePos.x;
      startMousePos.y = currentMousePos.y;

      dotSize = _.random(conf.dotSizeMin,conf.dotSizeMax)

      search([dotSize,dotSize]);
      moves = 0;
    }
    if(draw_around && draw && moves > moves_max){
      startMousePos.x = currentMousePos.x;
      startMousePos.y = currentMousePos.y;

      var q = [(endMousePos.x-startMousePos.x),(endMousePos.y-startMousePos.y)];

      search(q);
      moves = 0;
    }
  }
  function onMouseUp (e){
    endMousePos.x = e.pageX;
    endMousePos.y = e.pageY;

    var q = [(endMousePos.x-startMousePos.x),(endMousePos.y-startMousePos.y)]
    if (draw) search(q);
    $("#select").remove();
  }
  function onMouseDown (e){
    startMousePos.x = e.pageX;
    startMousePos.y = e.pageY;
    if (draw) appendSelectionZone();
  }

  // keys
  function onKeyDown( e ){
    if ( e.which == 32 ) if(draw == false) draw = true; // toogle draw mode
  }
  function onKeyUp( e ){
    if ( e.which == 32 ) {
      draw = false; // toogle draw mode
      draw_dot = false;
      draw_around = false;
    }
  }
  function saveAsPng(){

    html2canvas(document.body, {
      onrendered: function(canvas) {
        document.body.appendChild(canvas);
      },
      logging:true
    });
  }

  function onKeyPress ( e ){
    // r -> rm last selected part
    if ( e.which == 114 ) removeLastPart();

    // p -> export as image
    if ( e.which == 112 ) saveAsPng();

    // d -> draw with dot
    if ( e.which == 100 ) draw_dot = !draw_dot;

    // e -> eraser
    if ( e.which == 101 ) reset();

    // g -> generate random
    if ( e.which == 103) randomDrawing({elements:10});
    // h + j
    if ( e.which == 104) randomDrawing({elements:1, minHeight:400, minWidth:400, maxHeight:2000, maxWidth:2000, elementsPerLocation:1});
    if ( e.which == 106) randomDrawing({elements:100, minHeight:10, minWidth:10, maxHeight:500, maxWidth:20, elementsPerLocation:1});

    // q -> add element around the same point
    if ( e.which == 113 ) draw_around = !draw_around;

    // m -> mix !
    if ( e.which == 109 ) mix();

    // b -> rotate left
    if ( e.which == 98 ) $paper.find('img#'+lastSelected).rotate(-5);

    // n -> rotate right
    if ( e.which == 110 ) $paper.find('img#'+lastSelected).rotate(+5);

    // w -> start webcam
    if ( e.which == 119 ) init_camera();

    // s -> change last part
    if ( e.which == 115 ){
      queryFromDom(lastSelected);
      removeLastPart();

      var q = [(endMousePos.x-startMousePos.x),(endMousePos.y-startMousePos.y)]
      search(q);
    };
  }

  // remove last selected part
  function removeLastPart(){ $paper.find('img#'+lastSelected).remove(); }

  // exchange placement bettween drawing parts
  function mix(){
    var total = $paper.find("img").length;
    var offSet = Math.round(total/2) + _.random(0,total);
    if(offSet == total) offSet = 1;

    $paper.find("img").each(function(index) {

      var $this = $(this);
      var $target = $paper.find("img:nth-child("+ (((index+ offSet) % total)+1) +")");
      var top = $target.css('top');
      var left = $target.css('left');
      var pos = $target.position();

      setTimeout(function(){
        $this.animate({left: pos.left,top: pos.top }, Math.max(150, animationDuration/total));

      }, index*Math.max(150/1.5, animationDuration/1.5/total));
    })
  }

  // replace the last selected part with a new one
  function queryFromDom(selector){
    var current = $paper.find('img#'+lastSelected);

    console.log(selector,
    current,
    current.attr("id"),
    current.attr("width"),
    current.position()
    );
  }

  function init_camera(){
      var onCameraFail = function (e) { console.log('Camera did not work.', e) };
      var video = document.querySelector("#my_camera");
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      window.URL = window.URL || window.webkitURL;
      navigator.getUserMedia({video:true}, function (stream) {
          video.src = window.URL.createObjectURL(stream);
          localMediaStream = stream;
      }, onCameraFail);
  }

  function reset(){ if(confirm("💥 ?")) $paper.empty();}

  function init(d){
    // init_camera();

    // create history object for each clusters
    grid = _(d).forEach(function(d){ d.history = [] }).value();

    console.log(grid)

    $(document) // mouse
      .mousedown(onMouseDown)
      .mousemove(onMouseMove)
      .mouseup(onMouseUp)
      .keydown(onKeyDown)
      .keyup(onKeyUp)
      .keypress(onKeyPress);
  }

  // shared variables

  var
  currentMousePos = { x: -1, y: -1 },
  startMousePos = { x: -1, y: -1 },
  endMousePos = { x: -1, y: -1 },
  moves = 0, moves_max = 8,z = 0,
  draw = false,
  draw_dot = false,
  draw_around = false,
  animationDuration = 2500,
  $paper = $("#drawZone"),
  $video = $( "#my_camera" ), vid_h=1080,vid_w=1920,
  lastSelected,
  searchTry=0,
  grid,
  conf = {
    url:"http://localhost:3000/",
    publicCache:"/cache/1316/",
    step:10,
    dotSizeMin:20,
    dotSizeMax:500
  };

  // Load data and init
  $.getJSON(conf.publicCache+'index.json', init);

  // utils
  var nest = function (seq, keys) {
    if (!keys.length)
        return seq;
    var first = keys[0];
    var rest = keys.slice(1);
    return _.mapValues(_.groupBy(seq, first), function (value) {
        return nest(value, rest)
    });
  };

  jQuery.fn.rotate = function(rotation) {
    var currentRotate = $(this).attr('rotate') ? parseInt($(this).attr('rotate')) : 0;
    var degrees = currentRotate + rotation;

    console.log(degrees)

    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    $(this).attr('rotate', degrees)
    return $(this);
  };

  window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = 'It looks like you have been editing something. '
                              + 'If you leave before saving, your changes will be lost.';

      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
  });
});
