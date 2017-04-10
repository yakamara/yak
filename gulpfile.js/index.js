const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const requireDir = require('require-dir');

// Require all tasks in gulpfile.js/tasks, including subfolders
requireDir('./tasks', { recurse: true });

// define sequences
const tasks = [];
tasks.default = gulpSequence(
    'init',
    'clean',
    'styles',
    'scripts',
    'images',
    'svgs',
    'copy',
    'watch',
    'browserSync'
);
tasks.build = gulpSequence(
    'init',
    'clean',
    'styles',
    'scripts',
    'images',
    'svgs',
    'copy',
    'end'
);

// define tasks
gulp.task('build', tasks.build);

// define default alias
gulp.task('default', tasks.default);
