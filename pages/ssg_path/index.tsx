import React from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
const About = (props: HelloWorldProps) => {
    return (
        <div>
            <div className={styles.about}>这是about页面</div>
            <Link href="/about/55">详情页</Link>
        </div>
    );
};
About.getInitialProps = async function ({ store }) {
    const res = await fetch('http://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();
    store.dispatch({
        type: 'GET_USER_SUCCESS',
        payload: {
            cc: data,
        },
    });
    return {
        shows: data,
    };
};
export default About;
