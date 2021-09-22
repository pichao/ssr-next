import React from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import { DatePicker, DatePickerView, Checkbox } from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
import { Button } from 'antd';
// import { getServerSideProps } from 'pages';
export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
const About = (props: HelloWorldProps) => {
    return (
        <div>
            <DatePicker visible={false} />
            <DatePickerView />
            <Button type={'primary'}>rrrrrrrrrrr</Button>
            <div className={styles.about}>这是about页面</div>
            <Link href="/ssg_path/55">详情页</Link>
        </div>
    );
};

export async function getServerSideProps(context) {
    // console.log(publicRuntimeConfig, '这是什么玩意2222');
    // const res = await axios('http://localhost:8000/api/search/shows?q=batman');
    // console.log(data, 'shouye_render');
    return {
        props: {}, // will be passed to the page component as props
    };
}
export default About;
