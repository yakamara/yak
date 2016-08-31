var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpSequence = require('gulp-sequence');


var defaultTask = function (cb) {

    if (gutil.env.production) {
        // PROD
        gutil.log('\n' + gutil.colors.bgRed('\n  Production  ') + '\n');
        gulpSequence('clean', 'fonts', 'images', 'styles', 'scripts', 'end', cb);
    }
    else {
        // DEV
        gutil.log('\n' + gutil.colors.bgCyan('\n  Development  ') + '\n');
        gulpSequence('clean', 'fonts', 'svgs', 'images', 'styles', 'scripts', 'watch', cb);
    }
};


gulp.task('default', defaultTask);
module.exports = defaultTask;
