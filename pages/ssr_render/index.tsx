import React from 'react';
import styles from './index.module.scss';
import axios from 'axios';
export interface HelloWorldProps {
    userName?: string;
    lang?: string;
    users;
}
const Users = (props: HelloWorldProps) => {
    console.log(props, 'props');
    return (
        <div>
            <div className={styles.users}>999</div>
            <div className={styles.bac}>这是users谢谢大V查下页面</div>
        </div>
    );
};

export async function getServerSideProps(context) {
    // const res = await axios('http://localhost:8000/api/search/shows?q=batman');
    // console.log(res, 'ssr_render');
    return {
        props: {}, // will be passed to the page component as props
    };
}

// Users.getInitialProps = async function ({ store }) {
//     const res = await fetch('http://api.tvmaze.com/search/shows?q=batman');
//     const data = await res.json();

//     console.log(`Show data fetched. Count: ${data.length}`);
//     store.dispatch({
//         type: 'rotate',
//         payload: {
//             per_page: 2,
//         },
//     });
//     return {
//         shows: data,
//     };
// };
export default Users;
