import { useEffect } from 'react';
import '../public/css/fonts.css';
const WrappedApp = ({ Component, pageProps }) => {
    // const { pageProps, Component } = props;
    useEffect(() => {
        console.log('AAAAAAAAAAA');
        // if ('serviceWorker' in navigator) {

        // navigator.serviceWorker.register('/service-worker.js').then(
        //     (registration) => {
        //         console.log('serviceworker register successfull');
        //         navigator.serviceWorker.addEventListener('controllerchange', () => {
        //             console.log('你妈的');
        //         });
        //     },
        //     (error) => {
        //         console.log('service worker registration failed', error);
        //     },
        // );

        // }
    }, []);

    return (
        <>
            <Component {...pageProps} />
        </>
    );
};

export default WrappedApp;
