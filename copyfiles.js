const fs = require('fs');
/**
 * @param {需删除的路径} url
 */

function remove(url) {
    if (fs.existsSync(url)) {
        // 读取原路径
        const STATUS = fs.statSync(url);
        // 如果原路径是文件
        if (STATUS.isFile()) {
            //删除原文件
            fs.unlinkSync(url);

            //如果原路径是目录
        } else if (STATUS.isDirectory()) {
            //如果原路径是非空目录,遍历原路径
            //空目录时无法使用forEach
            fs.readdirSync(url).forEach((item) => {
                //递归调用函数，以子文件路径为新参数
                remove(`${url}/${item}`);
            });
            //删除空文件夹
            fs.rmdirSync(url);
        }
    }
}

/**
 * @param {原始路径} originalUrl
 * @param {目标路径} targetUrl
 */

function copy(originalUrl, targetUrl) {
    try {
        // 读取原路径
        const STATUS = fs.statSync(originalUrl);
        // 获得原路径的末尾部分
        // 此部分亦可通过path模块中的basename()方法提取
        const fileName = originalUrl.split('/')[originalUrl.split('/').length - 1];
        // 如果原路径是文件
        if (STATUS.isFile()) {
            // 在新目录中创建同名文件，并将原文件内容追加到新文件中
            // if (originalUrl === './server.js') {
            //     console.log(process.env, 'ttttttttt');
            //     fs.writeFileSync(
            //         `${targetUrl}/${fileName}`,
            //         fs
            //             .readFileSync(originalUrl)
            //             .toString('utf-8')
            //             .replace(/process\.env\.yyds_port/g, process.env.yyds_port)
            //             .replace(/process\.env\.yyds_apiUrl/g, `'${process.env.yyds_apiUrl}'`),
            //         // .replace(/false/, process.env.npm_config_serviceWorker),
            //     );
            // } else if (originalUrl === './serviceworker_update.txt') {
            //     fs.writeFileSync(
            //         `${targetUrl}/${fileName}`,
            //         fs
            //             .readFileSync(originalUrl)
            //             .toString('utf-8')
            //             .replace(/timeStamp/, new Date().getTime()),
            //     );
            // } else if (originalUrl === './service-worker.js') {
            //     fs.writeFileSync(
            //         `${targetUrl}/public/${fileName}`,
            //         fs
            //             .readFileSync(originalUrl)
            //             .toString('utf-8')
            //             .replace(/static_cache/, `static_cache_${new Date().getTime()}`),
            //     );
            // } else {
            //     fs.writeFileSync(`${targetUrl}/${fileName}`, fs.readFileSync(originalUrl));
            // }
            fs.writeFileSync(`${targetUrl}/${fileName}`, fs.readFileSync(originalUrl));

            //如果原路径是目录
        } else if (STATUS.isDirectory()) {
            //在新路径中创建新文件夹

            fs.mkdirSync(`${targetUrl}/${fileName}`);
            //如果原路径是非空目录,遍历原路径
            //空目录时无法使用forEach
            fs.readdirSync(originalUrl).forEach((item) => {
                //更新参数，递归调用
                move(`${originalUrl}/${item}`, `${targetUrl}/${fileName}`);
            });
        }
    } catch (error) {
        // fs.mkdirSync(`${targetUrl}`);
    }
}

/**
 * 定义移动函数(由复制函数与删除函数组成)
 * @param {原始路径} originalUrl
 * @param {目标路径} targetUrl
 */
function move(originalUrl, targetUrl) {
    //复制原路径中所有
    copy(originalUrl, targetUrl);
    //删除原路径中所有
    // if (originalUrl === './.next/.next') {
    //     console.log('此处有执行？');
    //     remove(originalUrl);
    // }
}
// remove('./deploy');

const getTargetFiles = () => {
    const filesArr = [
        // './serviceworker_update.txt',
        './bnext',
        './public',
        './.env-cmdrc.js',
        './next.config.js',
        './package.json',
        './ecosystem.config.js',
        './server.js',
        './node_modules',
    ];
    filesArr.forEach((file) => {
        copy(file, './deploy');
    });
};
fs.access('./deploy', (err, s) => {
    if (err) {
        fs.mkdir('./deploy', () => {
            getTargetFiles();
        });
    } else {
        fs.readdirSync('./deploy').forEach((item) => {
            //递归调用函数，以子文件路径为新参数
            remove(`./deploy/${item}`);
        });
        getTargetFiles();
    }
});
