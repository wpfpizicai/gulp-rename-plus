/**
 * Created by patrickliu on 15/5/28.
 */
var through = require('through2')
    , gutil = require('gulp-util')
    , crypto = require('crypto')
    , extend = require('node.extend')
    , fs = require('fs')
    , path = require('path')
    , glob = require('glob');


module.exports = function(options) {

    var defaults = {
        hashFunction: function(filename) {

            return function(content) {
                return filename.split('.').map(function(item, i, arr) {
                    return i == arr.length - 1 ? 'ejs' : item
                }).join('.');
            }
        }
    };

    options = extend(defaults, options);

    return through.obj(function(file, enc, cb) {

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'));
            return cb();
        }

        if(!file.contents){
            return cb();
        }

        var dirName = path.dirname(file.path),
            fileName = path.basename(file.path),
            hashFunction = options.hashFunction(fileName),
            fileContents = file.contents.toString('utf-8');

        file.path = path.join(dirName, hashFunction(fileContents));

        this.push(file);
        cb();
    });
}

function calcMd5(file){
    var md5 = crypto.createHash('md5');
    md5.update(file, 'utf8');

    return  md5.digest('hex').slice(0, 8);
}
