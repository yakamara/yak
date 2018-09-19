const gulp = require('gulp');
const init = require('@yakamara/gulp-tasks').require('init');

require('dotenv').load();

require('./config');

const tasks = {
    build: gulp.series(
        init.gulpTask({
            production: 'prod' === process.env.APP_ENV,
            watching: false,
        }),
        'clean',
        gulp.parallel(
            'styles',
            'scripts',
            'modernizr',
            'svgs',
            'images',
            'copy'
        )
    ),

    watch: gulp.series(
        init.gulpTask({
            production: 'prod' === process.env.APP_ENV,
            watching: true,
        }),
        'clean',
        'styles',
        'scripts',
        'modernizr',
        'svgs',
        'images',
        'copy',
        'browser-sync'
    ),
};

gulp.task('build', tasks.build);
gulp.task('watch', tasks.watch);
gulp.task('default', 'prod' === process.env.APP_ENV ? tasks.build : tasks.watch);
