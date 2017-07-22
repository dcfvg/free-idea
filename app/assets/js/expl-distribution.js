$(function() {

  console.log('ok ok');

  conf = {
    url:"http://localhost:3000/",
    publicCache:"/cache/metro/",
    step:10,
    dotSizeMin:20,
    dotSizeMax:20
  };

  d3.json(conf.publicCache+'index.json', function(error, collection){


    var partsCount = _.sum(collection, function(d){ return d.c });
    var partsMax = _.max(collection, function(d){ return d.c }).c;
    var maxWidth = _.max(collection, function(d){ return d.w }).w;
    var maxheight = _.max(collection, function(d){ return d.h }).h;

    console.log(partsMax, maxWidth);

    var w = $('#graph').width() , h = $( window ).height();
    var svg = d3.select('#graph').append('svg:svg').attr('width', w).attr('height', h);


    var scale = w/(maxWidth-1);
    var color = d3.scale.log().domain([1, partsMax/20]).range(['royalblue','tomato']);
    var cluster = svg.selectAll('.cluster').data(collection).enter()

      cluster
        .append('rect')
        .attr({
          x: xScale,
          y: yScale,
          width: clustScale,
          height: clustScale,
          class:'cluster',
          fill: clustFill
        })
        .on('mouseover',updatePreview)
        .on('mouseout',resetClust)
        .on('click',updatePreview)

    var previewZone = svg.append('rect').attr('class','previewZone');
    var preview = svg.append('image').attr('class','preview');;

    function resetClust(d){
      d3.select(this).attr('fill', clustFill);
    }
    function updatePreview(d){

      d3.select(this).attr('fill','red' );

      d3.select('.infos').text(function(){
        return d.w + 'x' + d.h + ' (' + d.c + '/'+ partsCount +' elements)';
      });

      var previewPosAttr = {
       x: conf.step * scale,
       y: conf.step * scale,
       width:  function(){ return xScale(d) },
       height: function(){ return yScale(d) }
      };

      preview
        .attr('xlink:href', function(){
          return  conf.publicCache+d.w+'x'+d.h+'/'+_.random(0, d.c - 1)+'.png';
        })
        .attr(previewPosAttr)

      previewZone.attr(previewPosAttr);
    }

    function clustFill(d)  { return color(d.c) }
    function clustScale(d) { return (conf.step * scale) }
    function xScale (d) { return d.w * scale }
    function yScale (d) { return d.h * scale }
  });
})
