import axios from 'axios';

import { config } from '../config';
import querystring from 'querystring';
interface Params {
    url: string;
    method?: string;
    data?: object; // 请求参数
    [propName: string]: any;
}
interface CallbackObj {
    error?: (data?) => void;
    success?: (data?) => void;
}

export const handleAjax = async (
    options: Params = {
        url: '',
        data: {},
        method: 'get',
    },
    callback = {
        error: (data?) => {},
        success: (data?) => {},
    },
    wait = 1000,
) => {
    let requestObj: any = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };
    if (requestObj.method.toLowerCase() === 'get') {
        requestObj = {
            ...options,
            params: { ...options.data },
        };
        delete requestObj.data;
    }
    console.log(`${config.nodeHost}:${process.env.port}${requestObj.url}`, 'mm');
    const requestData = await axios({
        ...requestObj,
        url: `${config.nodeHost}:${process.env.port}${requestObj.url}`,
    });
    console.log(requestData, 'nnnnnnnnnn');
    if (requestData.status === config.successCode) {
        requestData.data;
    } else {
        console.log('chucuole');
    }
};

export const debounce = (fn, wait = 1000) => {
    var timer = null;
    return function () {
        var context = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, wait);
    };
};

/* 
状态码处理函数
*/
const handleStatus = (error) => {
    if (error.status === 404) {
        console.log('404');
    }
};
