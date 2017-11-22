/**
 * config
 * contains preferences for gulp tasks, folders, extensions et al
 */

const config = {

    // A-Z!

    // Browsersync
    // https://www.browsersync.io/docs/options
    'browserSync': {
        "proxy": process.env.APP_HOST,
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
            'styles',
            'svgs'
        ]
    },

    // Copy
    // copy assets from source to app
    'copy': [
        {
            'title': 'Font - FontAwesome',
            'src': ['./node_modules/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}'],
            'dest': './public/assets/fonts/FontAwesome'
        }
    ],

    // cssnano (minifies CSS)
    // http://cssnano.co/options/
    'cssnano': {
        'autoprefixer': false,
        'zindex': false,
        'discardUnused': false,
        'mergeIdents': false,
        'reduceIdents': false
    },

    // Images
    'images': {
        'sourceFiles': [
            './assets/images/*.{jpg,png,gif,svg,ico}'
        ],
        'destinationFolder': './public/assets/images/',
        'watchFiles': [
            './assets/images/*.{jpg,png,gif,svg,ico}'
        ],
        'cleanFiles': ['./public/assets/images/**/*.{jpg,png,gif,svg,ico}']
    },

    // Modernizr
    // https://modernizr.com/docs
    'modernizr': {
        'feature-detects': [
            'touchevents'
        ],
        'options': [
            'setClasses'
        ],
        'classPrefix': ''
    },

    // Scripts
    'scripts': {
        'sourceFiles': ['./assets/scripts/script.js'],
        'destinationFolder': './public/assets/scripts',
        'watchFiles': ['./assets/scripts/**/*.js'],
        'cleanFiles': ['./public/assets/scripts/*.{js,map}']
    },

    // Styles
    'styles': {
        'sourceFiles': ['./assets/styles/*.scss'],
        'destinationFolder': './public/assets/styles',
        'watchFiles': ['./assets/styles/**/*.scss'],
        'cleanFiles': ['./public/assets/styles/*.{css,map}']
    },

    // SVG
    // combines SVG files to into one with <symbol> elements (»SVG sprite«)
    'svgs': {
        'sourceFiles': ['./assets/svgs/**/*.svg'],
        'destinationFolder': './public/assets/svgs',
        'watchFiles': ['./assets/svgs/**/*.svg'],
        'cleanFiles': ['./public/assets/svgs/*.svg']
    },

    // Watch
    // watches for file changes and fires up related tasks
    'watch': [
        {'images': ['images']},
        {'scripts': ['scripts']},
        {'styles': ['styles']},
        {'svgs': ['svgs']},
    ]
};

module.exports = config;
