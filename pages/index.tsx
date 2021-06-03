import React, { useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from './index.module.scss';
import Router from 'next/router';
// import { wrapper } from '../store';
import dayjs from 'dayjs';
import { handleAjax } from '../utils';
import { config } from '../config';
import { Button, DatePicker } from 'antd';

import Link from 'next/link';

import { shallowEqual, useSelector, useDispatch } from 'react-redux';
export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
const Index = (props: HelloWorldProps) => {
    const selectedData = useSelector((state) => {
        return state;
    }, shallowEqual) as any;
    console.log(selectedData, 'rrrrrrrrr');
    console.log(process.env, '这是什么玩意');
    // useEffect(() => {
    //     if ('serviceWorker' in navigator) {
    //         navigator.serviceWorker
    //             .register('/service-worker.js')
    //             .catch((err) => console.error('Service worker registration failed', err));
    //     } else {
    //         console.log('Service worker not supported');
    //     }
    // }, []);
    return (
        <div>
            <div>{dayjs().valueOf()}</div>
            <img src={'/images/a.jpg'} />
            <Image src={'/images/a.jpg'} alt="me" width="64" height="64" />
            <div className={styles.aaa}>这是首页</div>
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
        </div>
    );
};

Index.getInitialProps = async ({ store }) => {
    const res = await fetch('http://localhost:8000/api/search/shows?q=batman');
    const data = await res.json();

    console.log(data, 'cccccccccccc');
    store.dispatch({
        type: 'GET_USER_SUCCESS',
        payload: {
            cc: 'xxx',
        },
    });
    return {
        dd: 'aa',
        data,
    };
};

export default Index;
