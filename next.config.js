const withPlugins = require('next-compose-plugins');
// const withAntdLess = require('next-plugin-antd-less');
// const withImages = require('next-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const withPreact = require('next-plugin-preact');
const withLess = require('next-with-less');
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { extendDefaultPlugins } = require('svgo');
const fs = require('fs');
const path = require('path');
// const withOptimizedImages = require('next-optimized-images');
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
const isProd = process.env.NODE_ENV === 'production';
module.exports = withPlugins(
    [
        // [pluginAntdLess],
        // [withBundleAnalyzer],
        [withPreact],
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

        [
            withPWA,
            {
                pwa: {
                    dest: 'public',
                    disable: !isProd,
                    register: true,
                    scope: '/',
                    skipWaiting: true,
                    sw: 'service-worker.js',
                    //...
                },
            },
        ],
    ],
    {
        distDir: 'bnext',
        // swcMinify: true,
        webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
            // config.resolve.alias['~'] = path.resolve(__dirname);
            config.resolve.alias = {
                ...config.resolve.alias,

                '@themes': `./themes/${process.env.NEXT_PUBLIC_SITE}`,
            };
            config.module.rules.push({
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024, // 8kb
                            esModule: false,

                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: isProd ? '[hash:7].[ext]' : '[name].[ext]',

                                    outputPath: 'static',
                                },
                            },
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: true,
                            },
                            pngquant: {
                                quality: [0.65, 0.9],
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75,
                            },
                        },
                    },
                ],
                type: 'javascript/auto',
            });

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
