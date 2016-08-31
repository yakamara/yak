var config = require('../config');
if (!config.tasks.browserSync) return;


var gulp = require('gulp');
var browserSync = require('browser-sync');


var browserSyncTask = function() {
    browserSync.init(config.tasks.browserSync);
}


gulp.task('browserSync', browserSyncTask);
module.exports = browserSyncTask;