// ./frontend/pages/post/[slug].tsx
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { Layout } from "~/components/layout";

const Sanity: NextPage<{ slug: string }> = ({ slug }) => {
  const { data } = api.sanity.getBySlug.useQuery({
    slug,
  });

  if (!data) return <div>404</div>;
  
  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Layout>
        <article>
          {/* <h1>{post?.slug?.current}</h1> */}
          <h1>{data.title}</h1>
          <p>{data.publishedAt}</p>
          {data.categories.map((cat) => (
            <p key={cat}>{cat}</p>
          ))}
        </article>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const slug = context.params?.slug;
  
  if (typeof slug !== "string") throw new Error("no slug");

  await ssg.sanity.getBySlug.prefetch({ slug });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default Sanity;
