module.exports = {
    compress: true,
    basePath: '', // 允许你轻松将 Next.js 项目托管在域的子路径上。
    webpack(config, { webpack, isServer }) {
        config.resolve.alias['react'] = 'preact/compat';
        config.resolve.alias['react-dom'] = 'preact/compat';
        console.log(typeof process.env.serviceWorker, 'process.env.serviceWorker');
        config.plugins = [
            ...config.plugins,
            new webpack.DefinePlugin({
                'process.env': JSON.stringify({
                    port: process.env.npm_config_port,
                    serviceWorker: Boolean(process.env.npm_config_serviceWorker),
                }),
            }),

            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        ];

        return config;
    },
    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
        console.log(defaultPathMap, 'defaultPathMap');
        return {
            '/': { page: '/' },
            '/ssg_path': { page: '/ssg_path' },
            '/ssg_render': { page: '/ssg_render' },
            '/ssr_render': { page: '/ssr_render' },
            '/isr_render': { page: '/isr_render' },
            //   '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
            //   '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
            //   '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
        };
    },
    images: {
        loader: 'imgix',
        path: '',
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    future: {
        // if you use webpack5
        webpack5: true,
    },
};
