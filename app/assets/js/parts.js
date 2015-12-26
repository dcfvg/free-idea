$(function() {

  console.log('ok');

  conf = {
    url:"http://localhost:3000/",
    publicCache:"/content/cache-dev/",
    drawParts:"/sources/metro-result/",
    step:10,
    dotSizeMin:20,
    dotSizeMax:20
  };

  d3.json(conf.publicCache+'data.json', function(error, data){


    var collection = _(data).sortByAll(['h','w']).value();

    var partsCount = _.sum(collection, function(d){ return d.c });
    var partsMax = _.max(collection, function(d){ return d.c }).c;
    var maxWidth = _.max(collection, function(d){ return d.w }).w;
    var maxheight = _.max(collection, function(d){ return d.h }).h;

    // for ($h=$h_min; $h < $h_max; $h++) {
    //   if($h % 2 == 0) for ($w=$w_max; $w > $w_min; $w--) $res = array_merge((array)$res, listShapes($w, $h));
    //   else            for ($w=$w_min; $w < $w_max; $w++) $res = array_merge((array)$res, listShapes($w, $h));
    // }


    var clusterId = 0;
    var partId = 0;

    function addNextPart(){

      var currentCluster  = collection[clusterId];

      if(currentCluster.c < partId ){

        clusterId++;
        partId = 0;
        console.log(currentCluster)

      }else{
        partId ++;
      }

      var src = conf.publicCache + currentCluster.w + 'x' + currentCluster.h + '/' + partId + '.png';
      var img = $('<img src="'+ src +'">').on("load", function() {
        setTimeout(addNextPart, 50)

      }).on("error", function() {
        $(this).remove()
        setTimeout(addNextPart, 50)

      })

      $("#graph").append(img)

    }


    console.log(collection)
    addNextPart();

    // setInterval(addNextPart, 50);

  });
})
