/**
 * config
 * contains preferences for gulp tasks, folders, extensions et al
 */

const config = {

    // A-Z!

    // Autoprefixer (adds vendor prefixes to rules by http://caniuse.com)
    // https://github.com/postcss/autoprefixer
    'autoprefixer': {
        'browsers': [
            'last 3 versions', // base support
            'Chrome >= 21', // full flexbox support
            'Edge >= 12',
            'Explorer >= 10', // because <10 is shitty
            'Firefox >= 28', // full flexbox support
            'iOS >= 7.1', // full flexbox support
            'Opera >= 15',
            'Safari >= 6.1' // full flexbox support
        ]
    },

    // Browsersync
    // https://www.browsersync.io/docs/options
    'browserSync': {
        "startPath": "/app_dev.php/",
        "proxy": "project.loc",
        'port': 3000,
        'open': false,
        'reloadOnRestart': true,
        'notify': false,
        'reloadDelay': 0,
        'ghostMode': false // disable mirroring clicks, scrolls and forms. it’s too buggy.
    },

    // Clean
    // clean asset folders before new assets are generated
    'clean': {
        'cleanableTasks': [
            'images',
            'scripts',
            'styles'
        ]
    },

    // cssnano (minifies CSS)
    // http://cssnano.co/options/
    'cssnano': {
        'zindex': false,
        'discardUnused': false,
        'mergeIdents': false,
        'reduceIdents': false
    },

    // Images
    'images': {
        'sourceFiles': [
            './app/assets/images/*.{jpg,png,gif,svg,ico}',
            './node_modules/bootstrap-colorpicker/dist/img/**/*.{jpg,png,gif,svg}'
        ],
        'destinationFolder': './web/assets/images/',
        'watchFiles': [
            './app/assets/images/*.{jpg,png,gif,svg,ico}',
            './node_modules/bootstrap-colorpicker/dist/img/**/*.{jpg,png,gif,svg}'
        ],
        'cleanFiles': ['./web/assets/images/**/*.{jpg,png,gif,svg,ico}']
    },

    // Scripts
    'scripts': {
        'sourceFiles': ['./app/assets/scripts/script.js'],
        'destinationFolder': './web/assets/scripts',
        'watchFiles': ['./app/assets/scripts/**/*.js'],
        'cleanFiles': ['./web/assets/scripts/*.{js,map}']
    },

    // Styles
    'styles': {
        'sourceFiles': ['./app/assets/styles/*.scss'],
        'destinationFolder': './web/assets/styles',
        'watchFiles': ['./app/assets/styles/**/*.scss'],
        'cleanFiles': ['./web/assets/styles/*.{css,map}']
    },

    // Watch
    // watches for file changes and fires up related tasks
    'watch': [
        {'images': ['images']},
        {'scripts': ['scripts']},
        {'styles': ['styles']}
    ]
};

module.exports = config;
