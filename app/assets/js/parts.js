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

    var clusterId = 0;
    var partId = 0;

    function addNextPart(){

      var currentCluster  = collection[clusterId];

      if(currentCluster.c - 2 < partId ){

        clusterId++;
        partId = 0;
        console.log(currentCluster)

      }else{
        partId ++;
      }

      var src = conf.publicCache + currentCluster.w + 'x' + currentCluster.h + '/' + partId + '.png';
      var img = $('<img src="'+ src +'">').on("load", function() {
        setTimeout(addNextPart, 10)

      }).on("error", function() {
        $(this).remove()
        setTimeout(addNextPart, 10)

      })

      $("#graph").append(img)

    }


    console.log(collection)
    addNextPart();

    // setInterval(addNextPart, 50);

  });
})
