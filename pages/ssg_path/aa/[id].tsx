import React from 'preact/compat';
import styles from './index.module.scss';
import { useRouter } from 'next/router';

export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
const Post = ({ post }) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className={styles.about}>这是aaID页面</div>
        </div>
    );
};

// This function gets called at build time,fallback: true is not supported when using next export.
// export async function getStaticPaths() {
//     // Call an external API endpoint to get posts
//     // const res = await fetch('https://.../posts');

//     const posts = [
//         {
//             id: '1',
//         },
//     ];

//     // Get the paths we want to pre-render based on posts
//     const paths = posts.map((post) => ({
//         params: { id: post.id },
//     }));

//     // We'll pre-render only these paths at build time.
//     // { fallback: false } means other routes should 404.
//     return {
//         paths,
//         fallback: false,
//     }; // fallback参数为true时，在新的静态增量未生成时不会返回404，会返回一个回退页面
// }

// export async function getStaticProps({ params }) {
//     // params contains the post `id`.
//     // If the route is like /posts/1, then params.id is 1
//     // const res = await fetch(`https://.../posts/${params.id}`);
//     // const post = await res.json();
//     const post = [
//         {
//             id: '1',
//         },
//     ];
//     // Pass post data to the page via props
//     return { props: { post }, revalidate: 1 };
// }
export default Post;
