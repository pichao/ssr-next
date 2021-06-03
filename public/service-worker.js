// const CACHE_NAME = 'simple-cache-v1';
// const urlsToCache = ['/'];

// self.addEventListener('install', (event) => {
//     console.log('注册');
//     event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
// });

// // self.addEventListener('fetch', (event) => {
// //     const response = caches.match(event.request).then((match) => match || fetch(event.request));
// //     event.respondWith(response);
// // });

// self.addEventListener('fetch', function (evt) {
//     const urlObj = new URL(evt.request.url);

//     evt.respondWith(
//         caches.match(evt.request).then(function (cache) {
//             // if (/^\/api/.test(urlObj.pathname)) {
//             //     console.log('vvvvvvvv');
//             //     return fetch(evt.request).then(function (response) {
//             //         console.log('ddddddddddddd');
//             //         return response;
//             //     });
//             // }

//             if (cache) {
//                 return cache;
//             }
//             var request = evt.request.clone();
//             return fetch(request).then(function (response) {
//                 console.log(response, 'nnnnnnnnnnnn');
//                 // if (!response && response.status !== 200 && !response.headers.get('Content-type').match(/image/)) {
//                 //     return response;
//                 // }
//                 if (!/^\/api/.test(urlObj.pathname)) {
//                     var responseClone = response.clone();
//                     caches.open(CACHE_NAME).then(function (cache) {
//                         cache.put(evt.request, responseClone);
//                     });
//                 }

//                 return response;
//             });
//         }),
//     );
// });

// // importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js')

// // if (workbox) {
// //     // Workbox 加载完成
// //     workbox.core.setCacheNameDetails({
// //         prefix: 'app',
// //         suffix: 'v1',
// //         precache: 'precache',
// //         runtime: 'runtime'
// //       })
// //   }
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');
// 安装阶段跳过等待，直接进入 active
self.addEventListener('install', function (event) {
    event.waitUntil(self.skipWaiting());
});
const cachVersion = 'my-test-cache-v1';
self.addEventListener('activate', function (event) {
    event.waitUntil(
        Promise.all([
            // 更新客户端
            self.clients.claim(),

            // 清理旧版本
            caches.keys().then(function (cacheList) {
                return Promise.all(
                    cacheList.map(function (cacheName) {
                        if (cacheName !== 'my-test-cache-v1') {
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

// 图片请求: 缓存优先
workbox.routing.registerRoute(
    // Cache image files
    /.*\.(?:png|jpg|jpeg|svg|gif|css|js)/,
    // Use the cache if it's available
    new workbox.strategies.CacheFirst({
        // Use a custom cache name
        cacheName: 'workbox:image',
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
