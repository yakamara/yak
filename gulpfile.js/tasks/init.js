const gulp = require('gulp');
const gutil = require('gulp-util');

const task = (cb) => {

    if (gutil.env.production) {

        console.log(gutil.colors.white('\n  Production\n'));
    }
    else {

        console.log(gutil.colors.white('\n  Development\n'));
    }

    cb();
};

gulp.task('init', task);
module.exports = task;
