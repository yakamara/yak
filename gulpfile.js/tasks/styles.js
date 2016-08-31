var config = require('../config');
if (!config.tasks.styles) return;


var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var nano = require('gulp-cssnano');
var path = require('path');
var browserSync = require('browser-sync');
var size = require('gulp-size');
var plumber = require('gulp-plumber');


var options = {

    // Autoprefixer (adds vendor prefixes to rules by caniuse)
    // https://github.com/postcss/autoprefixer
    "autoprefixer": {
        "browsers": ['last 2 versions', 'Firefox >= 19', 'Chrome >= 20', 'Explorer >= 9', 'Safari >= 6', 'Opera >= 15'] // supporting viewport units vw and vh
    },

    // cssnano (minifies CSS)
    // http://cssnano.co/options/
    "cssnano": {
        "discardUnused": false,
        "zindex": false,
        "reduceIdents": false,
        "mergeIdents": false
    }
}

var onError = function (err) {
    //gutil.log('\n' + gutil.colors.bgRed('\n  Error (' + err.plugin + '): ' + err.message) + '\n');
    new Yak.Notification().error(err, 'Compilation Failed!');
};

var stylesTask = function () {
    return gulp.src( path.join(config.tasks.styles.src, '/*.{' + config.tasks.styles.extensions + '}') )
        .pipe(gutil.env.production ? gutil.noop() : sourcemaps.init())
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass())
        .pipe(postcss([
            autoprefixer(options.autoprefixer)
        ]))
        .pipe(plumber.stop())
        .pipe(gutil.env.production ? nano(options.cssnano) : gutil.noop())
        .pipe(size({'title': 'Styles'}))
        .pipe(size({'title': 'Styles', 'gzip': true}))
        .pipe(gutil.env.production ? gutil.noop() : sourcemaps.write('.'))
        .pipe(gulp.dest(config.tasks.styles.dest))
        .pipe(browserSync.stream({match: '**/*.css'})) // reload CSS only!
        .pipe(new Yak.Notification('Sass compiled!'))
        ;
};


gulp.task('styles', stylesTask);
module.exports = stylesTask;
