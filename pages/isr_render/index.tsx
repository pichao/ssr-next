import React from 'react';

import Link from 'next/link';
export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
const Index = (props: HelloWorldProps) => {
    return (
        <div>
            <div>qqq</div>
            <Link href="/">
                <a>用户列表页</a>
            </Link>
        </div>
    );
};
const getData = () => {
    return new Promise((resolve, reject) => {
        resolve({
            name: 'pitter',
        });
    });
};
/* 
getStaticProps 应该返回一个像这样的对象:
 props - 必须的的对象，带有将由页面组件接收的属性。它应该是一个可序列化的的对象。
 revalidate - 一个可选的配置，以秒为单位，可以在此数秒后重新你页面。配置了即为增量静态再生
*/

//  增量静态再生,这是一种在流量进入时于后台重新渲染现有页面来更新它们的机制。
// revalidate 标志是秒数，在此时间内最多有一次生成
export async function getStaticProps(context) {
    return {
        props: await getData(),
        // we will attempt to re-generate the page:
        // - when a request comes in
        // - at most once every second
        revalidate: 1,
    };
}

export default Index;
