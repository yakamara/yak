const gulp 	= require('gulp'),
    sass 	= require('gulp-sass'),
    concat 	= require('gulp-concat'),
    uglify 	= require('gulp-uglify');

const paths = {
    styles: {
        src: 'assets/styles/*.scss',
        dest: 'public/css/'
    },
    scripts: {
        src: 'assets/scripts/*.js',
        dest: 'public/js/'
    }
};

function styles() {
    return gulp
        .src(paths.styles.src, {
            sourcemaps: true
        })
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
    return gulp
        .src(paths.scripts.src, {
            sourcemaps: true
        })
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
    gulp.watch(paths.scripts.src, scripts);

    gulp.watch(paths.styles.src, styles);
}

const build = gulp.parallel(styles, scripts);

gulp.task('build', build);

gulp.task('default', gulp.series(build, watch));