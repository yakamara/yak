
var gulp = require('gulp')
var gutil = require('gulp-util');
var gulpSequence = require('gulp-sequence');


var buildTask = function (cb) {

    if (gutil.env.production) {

        // PROD
        gutil.log('\n' + gutil.colors.bgRed('\n  Production  ') + '\n');
    }
    else {

        // DEV
        gutil.log('\n' + gutil.colors.bgCyan('\n  Development  ') + '\n');
    }
    gulpSequence('clean', 'fonts', 'styles', 'scripts', 'end', cb);
}


gulp.task('build', buildTask);
module.exports = buildTask;
