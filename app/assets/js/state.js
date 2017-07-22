window.tree = tree;


var tree = new Baobab({

  cur:{
    current:  { x: -1, y: -1},
    dragStart:{ x: -1, y: -1},
    dragEnd:  { x: -1, y: -1},
    moves:0,
    moves_max:8
  },

  zindex:0,
  searchTry:0,

  isDrawing:false,
  isDrawingDots:false,
  isDrawingAround:false,

  mixDuration:2500,

  vid_h:1080,
  vid_w:1920,

  lastSelected:0,
  sets:{},
  set:{},

  settings:{}

});


/*

  source
  fragments
  cache
    index


*/