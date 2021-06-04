const express = require('express');
const next = require('next');
const url = require('url');
const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

const devProxy = {
    '/api': {
        target: 'http://api.tvmaze.com', // 端口自己配置合适的
        pathRewrite: {
            '^/api': '',
        },
        changeOrigin: true,
        // selfHandleResponse: true,

        // onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
        //     return '1';
        // }),
    },
};

const port = process.env.npm_config_port;
const dev = process.env.NODE_ENV !== 'production';
console.log(process.env, 'vvvvvvvvvvvvvv');
const app = next({
    dev,
});
const handle = app.getRequestHandler();
const cors = require('cors');
const socketIo = require('socket.io');
const fs = require('fs');
const isServiceWorker = false;
app.prepare()
    .then(() => {
        const server = express();
        server.use(cors());
        var http = require('http').createServer(server);
        Object.keys(devProxy).forEach(function (context) {
            server.use(createProxyMiddleware(context, devProxy[context]));
        });

        if (isServiceWorker) {
            const io = new socketIo.Server();
            io.attach(http);
            let timer = null;
            io.on('connection', (socket) => {
                clearInterval(timer);
                timer = setInterval(() => {
                    const updateStamp = fs.readFileSync('./serviceworker_update.txt').toString();

                    socket.emit('update', { updateStamp, pid: process.pid });
                }, 5000);

                socket.on('disconnect', () => {
                    console.log('client disconnected');
                });
            });
        }

        server.all('*', (req, res) => {
            handle(req, res);
        });

        http.listen(port, (err) => {
            if (err) {
                throw err;
            }
            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log('An error occurred, unable to start the server');
        console.log(err);
    });
