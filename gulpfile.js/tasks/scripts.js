var config = require('../config');
if (!config.tasks.scripts) return;

var gulp = require('gulp');
var gutil = require('gulp-util');
var watchify = require('watchify');
var browserify = require('browserify');
var resolutions = require('browserify-resolutions');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var browserSync = require('browser-sync');
var size = require('gulp-size');


var scriptsTask = function (cb) {

    var customOpts = {
        entries: [config.tasks.scripts.src + '/script.js'],
        debug: true
    };
    var opts = assign({}, watchify.args, customOpts);
    var b = watchify(browserify(opts))
        .plugin(resolutions, '*')
        .transform(babelify.configure({
            optional: ['es7.classProperties', 'runtime']
        }));

    b.on('update', bundle);
    b.on('log', gutil.log);

    function bundle() {
        return b.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('script.js'))
            .pipe(buffer())
            .pipe(gutil.env.production ? gutil.noop() : sourcemaps.init({loadMaps: true}))
            .pipe(gutil.env.production ? uglify() : gutil.noop())
            .pipe(gutil.env.production ? gutil.noop() : sourcemaps.write('./'))
            .pipe(gulp.dest(config.tasks.scripts.dest))
            .pipe(size({'title': 'Scripts'}))
            .pipe(size({'title': 'Scripts', 'gzip': true}))
            .pipe(browserSync.stream());
    }
    return bundle();
}


gulp.task('scripts', scriptsTask);
module.exports = scriptsTask;
