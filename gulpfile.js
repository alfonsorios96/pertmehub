const gulp = require('gulp');
const swPrecache = require('sw-precache');

gulp.task('service-worker-build', () => {
    const rootDir = 'build/default';
    swPrecache.write(`${rootDir}/service-worker.js`, {
        clientsClaim: true,
        navigateFallback: 'index.html',
        skipWaiting: true,

        staticFileGlobs: [
            '/bower_components/webcomponentsjs/webcomponents-loader.js',
            '/manifest.json',
            '/img/*',
            '/css/*',
            '/js/*',
            '/index.html'
        ],

        runtimeCaching: [
            {
                urlPattern: /\/bower_components\/webcomponentsjs\/.*.js/,
                handler: 'cacheFirst',
                options: {
                    cache: {
                        name: "webcomponentsjs-polyfills-cache"
                    }
                }
            },

            {
                urlPattern: /firebasestorage\.googleapis.com\/.*/,
                handler: 'networkFirst',
                options: {
                    cache: {
                        maxEntries: 300,
                        name: 'data-image-cache'
                    }
                }
            }


        ]
    });
});
