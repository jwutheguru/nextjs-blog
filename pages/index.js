import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import Date from "../components/date";

import utilStyles from '../styles/utils.module.css';

import { getSortedPostsData } from '../lib/posts';

// Static Site Rendering (SSG)
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

// Server Side Rendering (SSR)
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for the component
//     }
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I'm J.Wu the Guru!!</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <p>Read <Link href={"/posts/first-post"}>this page!</Link></p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
              {/* {title}
              <br />
              {id}
              <br />
              {date} */}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
