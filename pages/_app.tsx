import React from 'react';
import '../public/css/fonts.css';
const WrappedApp = ({ Component, pageProps }) => {
    // const { pageProps, Component } = props;

    return (
        <>
            <Component {...pageProps} />;
        </>
    );
};

export default WrappedApp;
