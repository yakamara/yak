const Encore = require('@symfony/webpack-encore');
const path = require('path');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')

    .copyFiles({
        from: './assets/images',
        to: Encore.isProduction()
            ? 'assets/images/[path][name].[hash:8].[ext]'
            : 'assets/images/[path][name].[ext]',
    })

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/app.js')

    // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
    //.enableStimulusBridge('./assets/controllers.json')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // .configureBabel((config) => {
    //     config.plugins.push('@babel/plugin-proposal-class-properties');
    // })

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    // enables Sass/SCSS support
    .enableSassLoader()
    .enablePostCssLoader()

    // enables SVG support
    .configureImageRule({}, rule => {
        rule.exclude = path.resolve(__dirname, 'assets/svgs');
    })

    .addLoader({
        test: /\.svg$/,
        include: path.resolve(__dirname, 'assets/svgs'),
        use: [
            {
                loader: 'svg-sprite-loader',
                options: {
                    symbolId: '[name]',
                }
            }, {
                loader: 'svgo-loader',
                options: {
                    plugins: [
                        {
                            name: 'preset-default',
                            params: {
                                overrides: {
                                    mergePaths: false,
                                    collapseGroups: false,
                                },
                            },
                        },
                    ],
                }
            },
        ]
    })

    .configureDevServerOptions(options => {
        options.server = {
            type: 'https',
            options: {
                key: '/opt/homebrew/etc/httpd/certs/cert-key.pem',
                cert: '/opt/homebrew/etc/httpd/certs/cert.pem',
            }
        }
        options.allowedHosts = 'all';
        options.client = {
            overlay: {
                errors: true,
                warnings: false,
            },
        };
        // options.firewall = false
    })

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()
;

// if (!Encore.isProduction()) {
//     Encore.disableCssExtraction();
// }

module.exports = Encore.getWebpackConfig();
