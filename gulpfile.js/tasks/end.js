var config = require('../config');


var gulp = require('gulp');
var gutil = require('gulp-util');


var endTask = function (cb) {
    gutil.log(gutil.colors.red('Finished build task.'));

    process.exit();
};


gulp.task('end', endTask);
module.exports = endTask;
