var config = require('../config');


var gulp = require('gulp');
var path = require('path');
var size = require('gulp-size');
var watch = require('gulp-watch');


var watchTask = function () {
    var watchableTasks = ['styles', 'svgs', 'images'];

    watchableTasks.forEach(function (taskName) {
        var task = config.tasks[taskName];
        if (task) {
            var glob = path.join(task.src, '**/*.{' + task.extensions.join(',') + '}');

            watch(glob, function () {
                require('./' + taskName)();
            });
        }
    });
};


gulp.task('watch', ['browserSync'], watchTask);
module.exports = watchTask;
