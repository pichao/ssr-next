module.exports = {
    apps: [
        {
            name: 'myapp',
            script: './server.js',
            args: 'one two',
            exec_mode: 'cluster',
            instances: 4,
            watch: false,
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
