var config = require('../config');
if (!config.tasks.images) return;

var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');


var imagesTask = function () {
    return gulp.src(path.join(config.tasks.images.src, '/**/*.{' + config.tasks.images.extensions + '}'))
        // minify on production only, otherwise just copy
        .pipe(gutil.env.production ? imagemin({
            use: [pngquant({quality: '65-80', speed: 4})]
        }) : gutil.noop())
        .pipe(gulp.dest(config.tasks.images.dest));
};


gulp.task('images', imagesTask);
module.exports = imagesTask;
