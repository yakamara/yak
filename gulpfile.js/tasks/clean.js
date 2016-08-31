var config = require('../config');


var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var del = require('del');


var cleanTask = function (cb) {
    var cleanableTasks = ['fonts', 'images', 'styles', 'scripts'];
    var targetFiles = [];

    cleanableTasks.forEach(function (taskName) {
        var task = config.tasks[taskName];
        if (task) {
            targetFiles.push(path.join(task.dest, '*.{' + task.clean.join(',') + '}'));
        }
    });

    del(targetFiles).then(touchedFiles => {
        if (touchedFiles.length > 0) {
            gutil.log('Cleaned ' + gutil.colors.magenta(touchedFiles.length + ' files') + ' in ' + gutil.colors.magenta(targetFiles.join(', ')));
        }
        else {
            gutil.log('Nothing to clean.');
        }
        cb();
    });
}


gulp.task('clean', cleanTask);
module.exports = cleanTask;
