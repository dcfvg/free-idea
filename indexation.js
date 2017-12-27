const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const fsync = require('fs-sync');
const mkdirp = require('mkdirp');
const glob = require('glob');
const _ = require('lodash');
const sizeOf = require('image-size');
const conf = require('./config.json');

const path_string = __dirname+'/'+argv['_'][0];

if(fs.statSync(path_string).isDirectory()) moveFiles(path_string);

function moveFiles(path_string){
  console.log('starting …');
  const cache = conf.publicCache+path.basename(path_string)+'/';
  var fileCount = 0;

  glob(path_string+'**/*.png', function (er, files) {

    console.log(files.length,'files to sort');

    _.forEach(files, function(f,i){
      var size = sizeOf(f);
      var approxSize = _.map(size, function(d){ return Math.ceil(d / 10) * 10;})

      var sizePath = cache+approxSize[0]+'x'+approxSize[1]+'/';

      mkdirp.sync(sizePath);
      var count = glob.sync(sizePath+'/*.png').length;

      fileCount += count;

      fsync.copy(f, sizePath+count+'.png');
    });

    console.log('\t'+fileCount+' moved !');
    writeIndex(cache);
  });
}

function writeIndex(cache){

  mkdirp.sync(conf.publicCache);
  console.log('indexing …');

  glob(cache+'**/*.png', function (er, files) {

    var grid = _(files)
      .map(function(file){ return file.replace(conf.publicCache,'') })
      .groupBy(function(file){ return path.dirname(file) })
      .map(function(group, key){
        var size = path.basename(key).split('x');
        return { c: group.length, w:parseInt(size[0]), h:parseInt(size[1])}
      })
      .value()

    fs.writeFile(cache+'index.json', JSON.stringify(grid) , function(err) {
        if(err) return console.log(err);
        console.log('\t done indexing '+grid.length+' clusters');
    });
  })
}
