const gulp = require('gulp');
const gutil = require('gulp-util');

const task = (cb) => {

    if ('prod' === process.env.APP_ENV) {
        console.log(gutil.colors.white('\n  Production\n'));
    }
    else {
        console.log(gutil.colors.white('\n  Development\n'));
    }

    cb();
};

gulp.task('init', task);
module.exports = task;
