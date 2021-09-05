import React from 'react';

const WrappedApp = ({ Component, pageProps }) => {
    // const { pageProps, Component } = props;

    return (
        <>
            <Component {...pageProps} />;
        </>
    );
};

export default WrappedApp;
