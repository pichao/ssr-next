import React, { useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from './index.module.scss';
import Router from 'next/router';
import { Button } from 'antd-mobile';
import { DatePicker, List } from 'antd-mobile';
import { now } from 'lodash';

// import Link from 'next/link'
// import { wrapper } from '../store';
import dayjs from 'dayjs';
import { handleAjax } from '../utils';
import { config } from '../config';
import getConfig from 'next/config';

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
// import { Button, DatePicker } from 'antd';
// import { useRequest } from 'ahooks';
import Link from 'next/link';
import { platform } from 'os';
// import io from 'socket.io-client';
// import HomeSvg from '../public/svg/home2.svg';
export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
const Index = (props: HelloWorldProps) => {
    // const selectedData = useSelector((state) => {
    //     return state;
    // }, shallowEqual) as any;
    // console.log(selectedData, 'rrrrrrrrr');
    console.log(publicRuntimeConfig, '这是什么玩意11111');
    // useEffect(() => {
    //     if (process.env.serviceWorker) {
    //         if ('serviceWorker' in navigator) {
    //             navigator.serviceWorker
    //                 .register('/service-worker.js')
    //                 .catch((err) => console.error('Service worker registration failed', err));
    //         } else {
    //             console.log('Service worker not supported');
    //         }
    //         const socket = io();
    //         socket.on('update', (data) => {
    //             console.log(data, 'socketdata');

    //             if (localStorage.versionInfo) {
    //                 const versionInfo = JSON.parse(localStorage.versionInfo);
    //                 if (versionInfo.pid !== data.pid && versionInfo.updateStamp !== data.updateStamp) {
    //                     // 只有前后端都更新了才刷新页面或者通知用户
    //                     console.log('版本更新');
    //                     localStorage.versionInfo = JSON.stringify(data);
    //                     setTimeout(() => {
    //                         location.reload();
    //                     }, 5000);
    //                 }
    //             } else {
    //                 localStorage.versionInfo = JSON.stringify(data);
    //             }
    //         });
    //     } else {
    //         const sw = window.navigator.serviceWorker;

    //         sw.getRegistration('/serviceWorker').then((registration) => {
    //             if (registration) {
    //                 // 手动注销
    //                 registration.unregister();
    //                 // 清除缓存
    //                 window.caches &&
    //                     caches.keys &&
    //                     caches.keys().then(function (keys) {
    //                         keys.forEach(function (key) {
    //                             caches.delete(key);
    //                         });
    //                     });
    //             }
    //         });
    //     }
    // }, []);

    return (
        <div data-sonicdiff="first">
            {/* <HomeSvg /> */}
            <div className={styles.aaa}>222</div>
            <div className={styles.background}>{process.env.NEXT_PUBLIC_SITE}</div>
            <span className="icon-home"></span>
            <img src={require(`./imgs/${process.env.NEXT_PUBLIC_SITE}/b.jpg`)} alt="" />
            <img src={require(`./imgs/${process.env.NEXT_PUBLIC_SITE}/222.png`)} alt="" />

            <img
                src={
                    '/optimize/img?url=https://images.pexels.com/photos/10334732/pexels-photo-10334732.jpeg&format=true'
                }
                alt=""
            />
            <div>{now()}</div>
            {/* <div>{dayjs().valueOf()}</div> */}
            {/* <img src={require('@images/a.jpg')} /> */}
            <DatePicker visible={false}>11111111</DatePicker>
            {/* <img src={require('./imgs/a.jpg')} alt="me" width="64" height="64" /> */}
            {/* <Image src={require('./imgs/a.jpg').default} alt="me" width="64" height="64" /> */}
            <Link href="/ssg_path">
                <Button type={'primary'}>ssg_path</Button>
            </Link>
            {/* <div className={styles.aaa}>这是首页444</div>
            <Button
                type={'primary'}
                onClick={async () => {
                    const res = await fetch('http://localhost:8000/api/search/shows?q=batman');
                    const data = await res.json();
                }}
            >
                1111
            </Button>
            <DatePicker />
            <Link href="/isr_render">
                <Button>isr_render</Button>
            </Link>
            <Link href="/ssg_path">
                <Button>ssg_path</Button>
            </Link>
            <Link href="/ssg_render">
                <Button>ssg_render</Button>
            </Link>
            <Link href="/ssr_render">
                <Button>ssr_render</Button>
            </Link>
            <button
                onClick={() => {
                    Router.push({
                        pathname: '/home',
                        query: { arg: 'sss' },
                    });
                }}
            >
                router跳转
            </button>
            <button
                onClick={() => {
                    handleAjax(
                        {
                            url: '/api/fcg-bin/cgi_playlist_xml.fcg',
                            method: 'get',
                            data: {
                                uin: '756475734',
                                json: 1,
                                g_tk: 1916754934,
                            },
                        },
                        {
                            error: () => {},
                            success: () => {},
                        },
                        5000,
                    );
                }}
            >
                dianji
            </button>
         */}
        </div>
    );
};

export const getServerSideProps = async (context) => {
    console.log(publicRuntimeConfig, '这是什么玩意2222');
    // const res = await axios('http://localhost:8000/api/search/shows?q=batman');
    // console.log(data, 'shouye_render');
    return {
        props: {}, // will be passed to the page component as props
    };
};

export default Index;
