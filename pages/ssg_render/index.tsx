import styles from './index.module.scss';
import React, { useEffect } from 'react';
import Image from 'next/image';
import A from 'components/index';
import { Button, DatePicker } from 'antd';
import { config } from 'config';
import Link from 'next/link';
import axios from 'axios';
import dayjs from 'dayjs';
export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
// import dynamic from 'next/dynamic';

// const DynamicComponentWithNoSSR = dynamic(() => import('components/index'), { ssr: false });

import B from 'components/index';
const Home = (props) => {
    // const selectedData = useSelector((state) => {
    //     return state;
    // }, shallowEqual) as any;

    // const dispatch = useDispatch();
    // console.log(props, selectedData, 'mmmmmmmmmmm');
    const { num } = props;
    return (
        <div>
            <div>{dayjs().valueOf()}</div>
            <B />
            <Link href="/home">
                <a>用户列表页</a>
            </Link>
            <button
                onClick={() => {
                    // dispatch({
                    //     type: 'GET_USER_SUCCESS',
                    //     payload: {
                    //         per_page: 2,
                    //     },
                    // });
                }}
            >
                发action
            </button>
            {/* <div>{selectedData.firstReducer.per_page}</div> */}

            {/* <div>{num.t}</div> */}
            <Button type={'primary'}>antd</Button>
            <DatePicker />
            <Image src={'/images/a.jpg'} alt="Picture of the author" width={500} height={500} />

            <div className={styles.home}>这是home页面</div>
        </div>
    );
};
export const getStaticProps = async () => {
    // 静态文件生成时，需要先开启本地node服务代理，拿到数据,因为静态生成是在编译的时候就生成数据了
    // const data = await axios({
    //     method: 'get',
    //     url: 'http://127.0.0.1:4000/api/search/shows',
    //     params: {
    //         q: 'ball',
    //     },
    // });
    // console.log(data.data, '这是数据');

    return {
        props: {
            // num: data.data,
            // list: data,
            // pitterData,
        },
        // revalidate: 1,
    };
};

export default Home;
