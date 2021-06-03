module.exports = {
    apps: [
        {
            name: 'myapp',
            script: './server.js',
            args: 'one two',
            exec_mode: 'cluster',
            // autorestart: true,
            watch: false,
            env: {
                NODE_ENV: 'production',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
