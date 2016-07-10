var glob = require('glob');
var _ = require('lodash');
var conf = require('./config.json')
var fs = require('fs');
var path = require('path');
var fs = require('fs');
var sizeOf = require('image-size');
var mkdirp = require('mkdirp');
var fs = require('fs');
var fsync = require('fs-sync');

moveFiles();

function moveFiles(){
  glob(__dirname+conf.drawParts+'**/*.png', function (er, files) {

    _(files).forEach(function(f,i){
      var size = sizeOf(f);
      var approxSize = _.map(size, function(d){ return Math.ceil(d / 10) * 10;})

      var path = __dirname+conf.publicCache+approxSize[0]+'x'+approxSize[1]+'/';

      mkdirp.sync(path);
      var count = glob.sync(path+'/*.png').length;

      fsync.copy(f, path+count+'.png');

    }).value()

    genJson();
  })
}
function genJson(){

  mkdirp.sync(__dirname+conf.publicCache);

  glob(__dirname+conf.publicCache+'**/*.png', function (er, files) {

    var grid = _(files)
      .map(function(file){ return file.replace(__dirname+conf.publicCache,'') })
      .groupBy(function(file){ return path.dirname(file) })
      .map(function(group, key){
        var size = key.split('x');
        return { c: group.length, w:parseInt(size[0]), h:parseInt(size[1])}
      })
      .value()

    // var grid = nest(files,["w","h"]);

    fs.writeFile(__dirname+conf.publicCache+'data.json', JSON.stringify(grid) , function(err) {
        if(err) return console.log(err);
        console.log("The file was saved!");
    });
  })
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

