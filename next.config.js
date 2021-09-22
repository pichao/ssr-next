const withPlugins = require('next-compose-plugins');
// const withAntdLess = require('next-plugin-antd-less');
// const withSass = require('@zeit/next-sass');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const withLess = require('next-with-less');
const path = require('path');
const withImages = require('next-images');
const withPWA = require('next-pwa');
// const pluginAntdLess = withAntdLess({
//     // modifyVars: {
//     //   '@THEME--DARK': 'theme-dark',
//     // },
//     // lessVarsFilePath: './src/styles/variables.less',
//     // cssLoaderOptions: {
//     //   esModule: false,
//     //   sourceMap: false,
//     //   modules: {
//     //     mode: 'local',
//     //   },
//     // },
// });
const withTM = require('next-transpile-modules')(['antd-mobile', 'antd']);
module.exports = withPlugins(
    [
        // [pluginAntdLess],
        [withBundleAnalyzer],
        [withLess],
        [withTM],
        [
            withImages,
            {
                // exclude: path.resolve(__dirname, './public/svg'),
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
            // config.resolve.alias['~'] = path.resolve(__dirname);
            config.resolve.alias = {
                ...config.resolve.alias,
                react: 'preact/compat',
                'react-dom': 'preact/compat',
                '@images': path.resolve(__dirname, `./public/${process.env.NEXT_PUBLIC_SITE}/images`),
            };
            config.module.rules.push({
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            });

            config.resolve.alias['@images/*'] = path.resolve(
                __dirname,
                `./public/${process.env.NEXT_PUBLIC_SITE}/images/*`,
            );
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
