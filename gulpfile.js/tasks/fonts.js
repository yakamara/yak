var config = require('../config');
if (!config.tasks.fonts) return;


var gulp = require('gulp');
var path = require('path');


var fontsTask = function () {
    var paths = config.tasks.fonts.src.map(function (src) {
        return path.join(src, '/**/*.{' + config.tasks.fonts.extensions + '}');
    });
    return gulp.src(paths)
        .pipe(gulp.dest(config.tasks.fonts.dest));
}

gulp.task('fonts', fontsTask);
module.exports = fontsTask;
