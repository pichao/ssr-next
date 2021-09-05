console.log(process.env, 'uuuuuuuuuuuuuu');

module.exports = {
    apps: [
        {
            name: 'myapp',
            script: './server.js',
            args: 'one two',
            exec_mode: 'cluster',
            instances: 4,
            watch: false,
            env_production: {
                NODE_ENV: 'production',
            },
            env_development: {
                NODE_ENV: 'development',
            },
        },
    ],
};
