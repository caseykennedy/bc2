import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";

import { api } from "~/utils/api";

import { Layout } from "~/components/layout";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching asap
  api.posts.getAll.useQuery();

  // Return empty div if user isn't loaded
  if (!userLoaded) return <div />;

  // const { data } = api.articles.getAll.useQuery();
  // console.log("testSanity:", data);

  return (
    <Layout>
      <section className="p-4">
        TEST
      </section>
    </Layout>
  );
};

export default Home;
