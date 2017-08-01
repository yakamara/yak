const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpSequence = require('gulp-sequence');
const copy = require('cpy');

// copy fontawesom icon fonts (npm package)
gulp.task('copy:fontawesome', (cb) => {
    let src = ['./node_modules/font-awesome/fonts/*.{woff,woff2}'];
    let dest = './public/assets/fonts';
    copy(src, dest, {}).then((res) => {
        if (res.length > 0) {
            gutil.log(gutil.colors.white('Copied font-awesome icon files: ' + gutil.colors.magenta(res.length)));
        }
        cb();
    });
});

const task = gulpSequence('copy:fontawesome');

gulp.task('copy', task);
module.exports = task;
