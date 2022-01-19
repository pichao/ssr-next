const { series, src, dest } = require('gulp');
const env = require('gulp-env');
const run = require('gulp-run');

const chalk = require('chalk');
/* 
部署所需文件
*/
const files = [
    './bnext//*.*',
    './public//*.*',
    './node_modules/**/*.*',

    './next.config.js',
    './package.json',
    './server.js',
];

/* 
开发模式代码，本地运行dev环境
*/
const runServerdev = (cb) => {
    run('cross-env NODE_ENV=development env-cmd -e dev,common -r ./.env-cmdrc.js node server.js', {
        verbosity: 3,
    }).exec();
    cb();
};
/* 
开发模式代码，本地运行release环境
*/
const runServerRelease = (cb) => {
    run('cross-env NODE_ENV=development env-cmd -e release,common -r ./.env-cmdrc.js node server.js', {
        verbosity: 3,
    }).exec();
    cb();
};
/* 
开发模式代码，本地运行prod环境
*/
const runServerProd = (cb) => {
    run('cross-env NODE_ENV=development env-cmd -e prod,common -r ./.env-cmdrc.js node server.js', {
        verbosity: 3,
    }).exec();
    cb();
};

/* 
生产模式代码，本地运行dev环境
*/
const runStartDev = (cb) => {
    run('cross-env NODE_ENV=production env-cmd -e dev,common -r ./.env-cmdrc.js node server.js', {
        verbosity: 3,
    }).exec();
    cb();
};
/* 
  生产模式代码，本地运行release环境
  */
const runStartRelease = (cb) => {
    run('cross-env NODE_ENV=production env-cmd -e release,common -r ./.env-cmdrc.js node server.js', {
        verbosity: 3,
    }).exec();
    cb();
};
/* 
  生产模式代码，本地运行prod环境
  */
const runStartProd = (cb) => {
    run('cross-env NODE_ENV=production env-cmd -e prod,common -r ./.env-cmdrc.js node server.js', {
        verbosity: 3,
    }).exec();
    cb();
};

/* 
打包生产模式dev环境代码
*/
const buildDev = (cb) => {
    run('cross-env NODE_ENV=production env-cmd -e dev,common -r ./.env-cmdrc.js next build', {
        verbosity: 3,
    }).exec();
    cb();
};

/* 
打包生产模式release环境代码
*/
const buildRelease = (cb) => {
    run('cross-env NODE_ENV=production env-cmd -e release,common -r ./.env-cmdrc.js next build', {
        verbosity: 3,
    }).exec();
    cb();
};

/* 
打包生产模式prod环境代码
*/
const buildProd = (cb) => {
    run('cross-env NODE_ENV=production env-cmd -e prod,common -r ./.env-cmdrc.js next build', {
        verbosity: 3,
    }).exec();
    cb();
};

/* 
获取命令行参数
*/
const getArgvs = () => {
    const srgvs = process.argv.filter((item) => item.indexOf('yyds') !== -1).map((item) => item.replace('--', ''));
    const targetObj = {
        yyds_site: 'yb',
        yyds_port: '9000',
    };
    srgvs.forEach((item) => {
        const key = item.split('=')[0];
        const value = item.split('=')[1];
        targetObj[key] = value;
    });
    return targetObj;
};

/* 
  获取命令行参数并添加至env任务
  */
const argv = (cb) => {
    const argvs = getArgvs();
    env.set(argvs);
    console.log(chalk.green(`设置命令行参数：${JSON.stringify(argvs)}`));
    cb();
};

/* 
搜集生产部署所需文件任务
*/
const copyFilesToDist = (cb) => {
    return src(files, { base: './' }).pipe(dest('deploy'));
};
exports.copyFilesToDist = copyFilesToDist;
exports['server:dev'] = series(argv, runServerdev);
exports['server:release'] = series(argv, runServerRelease);
exports['server:prod'] = series(argv, runServerProd);

exports['build:dev'] = series(argv, buildDev);
exports['build:release'] = series(argv, buildRelease);
exports['build:prod'] = series(argv, buildProd);

exports['deploy:dev'] = series(argv, buildDev, copyFilesToDist);
exports['deploy:release'] = series(argv, buildRelease, copyFilesToDist);
exports['deploy:prod'] = series(argv, buildProd, copyFilesToDist);

exports['start:dev'] = series(argv, runStartDev);
exports['start:release'] = series(argv, runStartRelease);
exports['start:prod'] = series(argv, runStartProd);
