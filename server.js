const express = require('express');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const sharp = require('sharp');
const handle = app.getRequestHandler();
app.prepare()
    .then(() => {
        const server = express();

        server.get('/optimize/img', async (req, res, next) => {
            let transform;
            const { format, url } = req.query;
            const readStream = await fetch(url);
            if (format) {
                transform = sharp().resize(10, undefined, { fit: 'cover' }).jpeg({ progressive: true });
            } else {
                transform = sharp().resize().jpeg({ progressive: true });
            }
            const cacheMaxAge = 30 * 60; // 30 分钟
            res.set('Cache-control', `public, max-age=${cacheMaxAge}`);
            res.set('Content-Type', readStream.headers.get('content-type'));
            // 最终响应图片
            readStream.body.pipe(transform).pipe(res);
        });
        server.get('*', async (req, res) => {
            return handle(req, res);
        });
        const port = process.env.NEXT_PUBLIC_PORT;
        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
