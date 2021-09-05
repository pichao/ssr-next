import React, { useEffect } from 'react';
import styles from './index.module.scss';
import dynamic from 'next/dynamic';
import Link from 'next/link';
// import Player from 'xgplayer/dist/simple_player';
// import volume from 'xgplayer/dist/controls/volume';
// import playbackRate from 'xgplayer/dist/controls/playbackRate';
export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
const About = (props: HelloWorldProps) => {
    // useEffect(() => {
    //     console.log(process, 'aaaaaaaaaaaaaaaaa');
    //     // if (window) {
    //     const Player = require('xgplayer');
    //     console.log(Player, 'vvvvvvvvvv');
    //     // setTimeout(() => {
    //     new Player({
    //         id: 'vs',
    //         autoplay: true,
    //         url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
    //         // controlPlugins: [volume, playbackRate],
    //         playbackRate: [0.5, 0.75, 1, 1.5, 2], //传入倍速可选数组
    //     });
    //     // }, 300);
    //     // }
    // }, []);

    return (
        <div>
            <div id="vs" style={{ height: '300px' }}></div>
            <div className={styles.aaa}>111</div>
            {/* <div className={styles.about}>这是about页面</div> */}
            <Link href="/about/55">详情页</Link>
        </div>
    );
};

export default About;
