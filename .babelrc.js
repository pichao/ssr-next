module.exports = {
    presets: [['next/babel']],
    plugins: [
        ['import', { libraryName: 'antd-mobile', style: true }, 'antd-mobile'],
        ['import', { libraryName: 'antd', style: true }, 'antd'],
        ['lodash'],
    ],
};
