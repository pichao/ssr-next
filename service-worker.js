importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');
workbox.setConfig({ debug: false }); // 禁止workbox打印缓存信息

// 安装阶段跳过等待，直接进入 active
self.addEventListener('install', function (event) {
    event.waitUntil(self.skipWaiting());
});
const cachVersion = 'static_cache';
self.addEventListener('activate', function (event) {
    event.waitUntil(
        Promise.all([
            // 更新客户端
            self.clients.claim(),

            // 清理旧版本
            caches.keys().then(function (cacheList) {
                return Promise.all(
                    cacheList.map(function (cacheName) {
                        if (cacheName !== cachVersion) {
                            return caches.delete(cacheName);
                        }
                    }),
                );
            }),
        ]),
    );
});

// 网络优先
workbox.routing.registerRoute(/\/api\//, new workbox.strategies.NetworkOnly());

// //缓存优先，同时后台更新后下次打开页面才会被页面使用
// workbox.routing.registerRoute(({ url, event }) => {
//     return /^\/api/.test(url.pathname);
// }, new workbox.strategies.staleWhileRevalidate());

// 静态资源缓存
workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif|css|js)/,
    // Use the cache if it's available
    new workbox.strategies.CacheFirst({
        // Use a custom cache name
        cacheName: cachVersion,
        plugins: [
            new workbox.expiration.Plugin({
                // Cache only 20 images
                maxEntries: 20,
                // Cache for a maximum of a week
                maxAgeSeconds: 7 * 24 * 60 * 60,
            }),
        ],
    }),
);
