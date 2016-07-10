var glob = require('glob');
var _ = require('lodash');
var conf = require('./config.json');
var fs = require('fs');
var path = require('path');
var fs = require('fs');
var sizeOf = require('image-size');
var mkdirp = require('mkdirp');
var fs = require('fs');
var fsync = require('fs-sync');
var argv = require('yargs').argv;
var conf = require('./config.json');


const path_string = __dirname+'/'+argv['_'][0];

fs.stat(path_string, function(err,res){
  if(res.isDirectory(path_string)) moveFiles(path_string)
})

function moveFiles(path_string){
  console.log('moving files …');
  const cache = conf.publicCache+path.basename(path_string)+'/';
  var fileCount = 0;

  glob(path_string+'**/*.png', function (er, files) {

    _(files).forEach(function(f,i){
      var size = sizeOf(f);
      var approxSize = _.map(size, function(d){ return Math.ceil(d / 10) * 10;})

      var sizePath = cache+approxSize[0]+'x'+approxSize[1]+'/';

      mkdirp.sync(sizePath);
      var count = glob.sync(sizePath+'/*.png').length;

      fileCount += count;

      fsync.copy(f, sizePath+count+'.png');

    }).value()

    console.log('\t'+fileCount+' moved !');
    writeIndex(cache);
  })
}

function writeIndex(cache){

  mkdirp.sync(conf.publicCache);
  console.log('indexing …');

  glob(cache+'**/*.png', function (er, files) {

    var grid = _(files)
      .map(function(file){ return file.replace(conf.publicCache,'') })
      .groupBy(function(file){ return path.dirname(file) })
      .map(function(group, key){
        var size = key.split('x');
        return { c: group.length, w:parseInt(size[0]), h:parseInt(size[1])}
      })
      .value()

    fs.writeFile(cache+'index.json', JSON.stringify(grid) , function(err) {
        if(err) return console.log(err);
        console.log('\t done indexing '+grid.length+' clusters');
    });
  })
}
