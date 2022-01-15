const withPlugins = require('next-compose-plugins');
// const withAntdLess = require('next-plugin-antd-less');
const withImages = require('next-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const withLess = require('next-with-less');
const fs = require('fs');
const path = require('path');
const withOptimizedImages = require('next-optimized-images');
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
console.log(process.env.NEXT_PUBLIC_SITE, '999999');
module.exports = withPlugins(
    [
        // [pluginAntdLess],
        // [withBundleAnalyzer],
        [withLess],
        [withTM],
        // [
        //     withImages,
        //     {
        //         esModule: false,
        //     },
        // ],
        // [
        //     withOptimizedImages,
        //     {
        //         // esModule: false,
        //         optimizeImagesInDev: true,
        //         handleImages: ['jpeg', 'png', 'svg'],
        //         responsive: {
        //             adapter: require('responsive-loader/sharp'),
        //         },
        //     },
        // ],

        // [
        //     withImages,
        //     {
        //         esModule: false,
        //         inlineImageLimit: 1024,
        //     },
        // ],
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
        // swcMinify: true,
        webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
            // config.resolve.alias['~'] = path.resolve(__dirname);
            config.resolve.alias = {
                ...config.resolve.alias,
                react: 'preact/compat',
                'react-dom': 'preact/compat',

                '@themes': `./themes/${process.env.NEXT_PUBLIC_SITE}`,
            };
            // console.log(config.assetPrefix, '99999');
            config.module.rules.push({
                test: /\.(woff|woff2|eot|ttf|svg|png|jpg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 400 * 1024, // 4kb
                    },
                },
            });

            // config.resolve.alias['@images/*'] = path.resolve(
            //     __dirname,
            //     `./public/${process.env.NEXT_PUBLIC_SITE}/images/*`,
            // );
            return config;
        },
        images: {
            disableStaticImages: true,
        },
        sassOptions: {
            additionalData: fs.readFileSync(
                path.resolve(__dirname, `./themes/${process.env.NEXT_PUBLIC_SITE}/index.module.scss`),
                'utf8',
            ),
        },
        // webpack5: false,
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
