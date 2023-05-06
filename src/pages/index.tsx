import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LoadingPage } from "~/components/loading";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user, isSignedIn } = useUser();

  console.log(user);

  if (!user) return null;

  return (
    <div className="flex gap-3">
      {!!isSignedIn && <UserButton />}
      <input placeholder="type some emojis" className="bg-transparent" />
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div className="flex flex-col gap-5 border-b border-slate-400 p-5">
      <div>
        <Image
          src={author.profilePicture}
          width={56}
          height={56}
          alt={`@${author.username}'s profile pic`}
          className="rounded-full"
        />
      </div>
      <div>{post.content}</div>
      <div className="text-sm">
        <div>{`@${author.username}`}</div>
        <div className="text-sm">{dayjs(post.createdAt).fromNow()}</div>
      </div>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;

  return (
    <div>
      {[...data, ...data]?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isSignedIn, isLoaded: userLoaded } = useUser();

  // Start fetching asap
  api.posts.getAll.useQuery();

  // Return empty div if user isn't loaded yet
  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-col p-6">
        <div className="">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            bc-leaks 2.0
          </h1>
          <div>
            {!isSignedIn && <SignInButton />}
            {isSignedIn && <CreatePostWizard />}
          </div>
          <div>
            <Feed />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
