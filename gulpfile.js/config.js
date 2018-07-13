const tasks = require('@yakamara/gulp-tasks');

tasks.require('browserSync').configure({
    proxy: process.env.APP_HOST,
});

tasks.require('clean').configure({
    paths: './public/assets/{fonts,images,styles,scripts,svgs}/**/*',
});

const copy = tasks.require('copy');
copy.create('fonts', {
    source: './assets/fonts',
    files: '**/*.{woff,woff2}',
    destination: './public/assets/fonts'
});
// copy.create('font-awesome', {
//     source: './node_modules/font-awesome/fonts',
//     files: '*.{woff,woff2}',
//     destination: './public/assets/fonts'
// });

const images = tasks.require('images');
images.create('images', {
    source: './assets/images',
    destination: './public/assets/images'
});
// images.create('bootstrap-colorpicker', {
//     source: './node_modules/bootstrap-colorpicker/dist/img/bootstrap-colorpicker',
//     destination: './public/assets/images/bootstrap-colorpicker'
// });

tasks.require('modernizr').configure({
    destination: './public/assets/scripts',
});

tasks.require('scripts').configure({
    source: './assets/scripts/script.js',
    destination: './public/assets/scripts',
});

tasks.require('styles').configure({
    source: './assets/styles/*.scss',
    destination: './public/assets/styles',
    sassVariables: {
        $env: process.env.APP_ENV
    },
});

tasks.require('svgs').configure({
    source: './assets/svgs/*.svg',
    destination: './public/assets/svgs',
});
