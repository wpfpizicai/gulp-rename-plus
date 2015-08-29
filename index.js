var path = require('path')
, gutil = require('gulp-util')
, through = require('through2')
, crypto = require('crypto')
, fs = require('fs')
, glob = require('glob');


module.exports = function(options) {

    return through.obj(function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'));
            return cb();
        }

        if(!file.contents){
            return cb();
        }

        var filename = path.basename(file.path)
        , relativepath = path.relative(file.base ,file.path)
        , sub_namepath = relativepath.replace(new RegExp(filename) , "").split(path.sep).join('/')
        , dir;

        if(file.path[0] == '.'){
            dir = path.join(file.base, file.path);
        } else {
            dir = file.path;
        }
        dir = path.dirname(dir);

        var _filename = filename.split('.').map(function(item, i, arr){
            return i == arr.length-1 ? options.suffix : item;
        }).join('.');


        file.path = path.join(dir, _filename);

        this.push(file);
        cb();
    }, function (cb) {
        cb();
    });
}

