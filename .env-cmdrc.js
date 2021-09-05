const siteConfigs = {
    yyds_yb: {
        common: {
            port: process.env.npm_config_port,
            yyds_port: 3000,
            yyds_name: process.env.npm_config_site,
        },
        dev: {
            yyds_apiUrl: '1111',
        },
        release: {
            yyds_apiUrl: '222',
        },
        prod: {
            yyds_apiUrl: '333',
        },
    },
    yyds_leyu: {
        common: {
            port: process.env.npm_config_port,
            yyds_name: process.env.npm_config_site,
        },
        dev: {
            yyds_apiUrl: 'leyu1111',
        },
        release: {
            yyds_apiUrl: 'leyu222',
        },
        prod: {
            yyds_apiUrl: 'leyu333',
        },
    },
    yyds_hth: {
        common: {
            port: process.env.npm_config_port,
            yyds_name: process.env.npm_config_site,
        },
        dev: {
            yyds_apiUrl: 'hth1111',
        },
        release: {
            yyds_apiUrl: 'hth222',
        },
        prod: {
            yyds_apiUrl: 'hth333',
        },
    },
};

module.exports = new Promise((resolve, reject) => {
    const rcArgvs = siteConfigs[process.env.npm_config_site];
    return resolve(rcArgvs);
});
