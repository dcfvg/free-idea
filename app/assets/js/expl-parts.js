$(function() {

  console.log('ok');

  conf = {
    url:"http://localhost:3000/",
    publicCache:"/cache/metro/",
    step:10,
    dotSizeMin:20,
    dotSizeMax:20
  };

  d3.json(conf.publicCache+'index.json', function(error, data){


    var collection = _(data)
      .sortByAll(['h','w']).filter(function(d){
        // return true
        return d.w < 100
      }).value();

    // group by h
    // array reverse %2 === 0

    var partsCount = _.sum(collection, function(d){ return d.c });
    var partsMax = _.max(collection, function(d){ return d.c }).c;
    var maxWidth = _.max(collection, function(d){ return d.w }).w;
    var maxheight = _.max(collection, function(d){ return d.h }).h;

    var clusterId = 0;
    var partId = 0;
    var widthId = 0;

    function addNextPart(){

      var currentCluster  = collection[clusterId];

      if(currentCluster.c - 2 < partId ){
        clusterId++;
        partId = 0;
      }else{
        partId++;
        $('html,body').scrollTop($( document ).height());
      }

      var toDisplay = partId;
      if (clusterId % 2 === 0 )toDisplay = (currentCluster.c - 1) - partId;

      var src = conf.publicCache + currentCluster.w + 'x' + currentCluster.h + '/' + toDisplay + '.png';
      var img = $('<img src="'+ src +'">')

      $("#graph").append(img)
      if(clusterId < collection.length - 1)  setTimeout(addNextPart, 10)

    }
    addNextPart();

  });
})
