var config = require('../config');
if (!config.tasks.svgs) return;


var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var path = require('path');
var size = require('gulp-size');
var plumber = require('gulp-plumber');


var svgsTask = function () {
    return gulp.src( path.join(config.tasks.svgs.src, '/**/*.' + config.tasks.svgs.extensions) )
        .pipe(plumber())
        .pipe(svgmin(function getOptions(file) {
            var filename = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    addClassesToSVGElement: {
                        className: 'svg-' + filename
                    }
                }]
            }
        }))
        // .pipe(svgstore({
        //     inlineSvg: false
        // }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(config.tasks.svgs.dest))
};


gulp.task('svgs', svgsTask);
module.exports = svgsTask;
