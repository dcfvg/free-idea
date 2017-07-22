
// listen to browser refresh and add a warning
function addCloseWarning(){
  window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = 'It looks like you have been editing something. '
                              + 'If you leave before saving, your changes will be lost.';

      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
  });
}


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
