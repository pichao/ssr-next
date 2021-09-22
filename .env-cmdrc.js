const siteConfigs = {
    yb: {
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
    leyu: {
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
    hth: {
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
const yyds_site = 'yb';
module.exports = new Promise((resolve, reject) => {
    const rcArgvs = siteConfigs[yyds_site];
    return resolve({
        rcArgvs,
        common: {
            ...rcArgvs.common,
            NEXT_PUBLIC_SITE: yyds_site,
        },
    });
});
