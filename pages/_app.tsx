import React from 'react';

import { wrapper } from '../store/index';
import 'antd-mobile/dist/antd-mobile.css';

const WrappedApp = (props) => {
    const { pageProps, Component } = props;
    return <Component {...pageProps} />;
};

WrappedApp.getInitialProps = async ({ Component, ctx }) => {
    // Keep in mind that this will be called twice on server, one for page and second for error page

    return {
        Component,
        pageProps: {
            // Call page-level getInitialProps
            ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
            // Some custom thing for all pages
            // appProp: ctx.pathname,
        },
    };
};

export default wrapper.withRedux(WrappedApp);
