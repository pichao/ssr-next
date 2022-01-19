const siteConfigs = {
    yb: {
        common: {
            NEXT_PUBLIC_params1: 'params1',
            NEXT_PUBLIC_params2: 'params1',
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
            NEXT_PUBLIC_params1: 'params1',
            NEXT_PUBLIC_params2: 'params1',
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
            NEXT_PUBLIC_params1: 'params1',
            NEXT_PUBLIC_params2: 'params1',
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
const getCommandParams = () => {
    const commandParams = {};
    Object.keys(process.env)
        .filter((item) => /yyds/.test(item))
        .forEach((item) => {
            const key = item.replace('yyds_', '').toUpperCase();
            const value = process.env[item];
            commandParams[`NEXT_PUBLIC_${key}`] = value;
        });
    return commandParams;
};
module.exports = new Promise((resolve, reject) => {
    const commandParams = getCommandParams();

    const rcArgvs = siteConfigs[commandParams['NEXT_PUBLIC_SITE']];

    return resolve({
        rcArgvs,
        common: {
            ...rcArgvs.common,
            ...commandParams,
        },
    });
});
