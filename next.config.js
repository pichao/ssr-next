const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');
// const withSass = require('@zeit/next-sass');

const withImages = require('next-images');
// const withPWA = require('next-pwa');
const pluginAntdLess = withAntdLess({
    // modifyVars: {
    //   '@THEME--DARK': 'theme-dark',
    // },
    // lessVarsFilePath: './src/styles/variables.less',
    // cssLoaderOptions: {
    //   esModule: false,
    //   sourceMap: false,
    //   modules: {
    //     mode: 'local',
    //   },
    // },
});
module.exports = withPlugins(
    [
        [pluginAntdLess],
        [
            withImages,
            {
                // assetPrefix: 'https://example.com',
                esModule: false,
            },
        ],
        // [
        //     withPWA,
        //     {
        //         pwa: {
        //             dest: 'public',
        //             // disable: process.env.NODE_ENV === 'development',
        //             // register: true,
        //             // scope: '/',
        //             skipWaiting: true,
        //             sw: 'service-worker.js',
        //             //...
        //         },
        //     },
        // ],
    ],
    {
        distDir: 'bnext',

        webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
            return config;
        },
        images: {
            disableStaticImages: true,
        },
        // NextFuture
        // future: {
        //   webpack5: true,
        // },
    },
);
// const withImages = require('next-images');
// module.exports = withImages({
//     images: {
//         disableStaticImages: true,
//     },
//     //   assetPrefix: 'https://example.com',
//     //   dynamicAssetPrefix: true,
//     webpack(config, options) {
//         return config;
//     },
// });
