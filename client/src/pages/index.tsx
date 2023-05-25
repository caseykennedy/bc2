import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { PostView } from "~/components/postview";
import { api } from "~/utils/api";

const CreatePostWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  if (!user) return null;

  return (
    <div className="flex w-full gap-3">
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: {
              width: 56,
              height: 56,
            },
          },
        }}
      />
      <input
        placeholder="Type some emojis!"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
        disabled={isPosting}
      />
      {input !== "" && !isPosting && (
        <button onClick={() => mutate({ content: input })}>Post</button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading)
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex grow flex-col">
      {[...data].map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

type ArticleShape = {
  author: {
    name: string;
  };
  name: string;
  title: string;
  publishedAt: string;
  body: string;
  categories: string[];
  slug: string;
};

const CardFeature = ({ slug, title, publishedAt, author }: ArticleShape) => {
  return (
    <Link href={`/article/${slug}`} className="w-full">
      <div className="flex flex-col gap-4 border-b border-zinc-800 px-2 pb-4">
        <figure className="aspect-video overflow-hidden rounded-md">
          <img
            src="https://images.unsplash.com/photo-1682686581427-7c80ab60e3f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80"
            alt="alt"
          />
        </figure>
        <div>
          <p className="text-sm">{dayjs(publishedAt).format("MMM DD, YYYY")}</p>
          <h3 className="mb-4 text-4xl">
            How 3XP Plans to Reshape Cryptos Reputation Among Gamers and Nerds
            Alike
          </h3>
          <div className="flex w-full grow flex-row items-center justify-between">
            <span>summary</span> <span>3 min read</span>
          </div>
          {/* <p>{props.body}</p> */}
          {/* <p>{props.categories}</p> */}
        </div>
      </div>
    </Link>
  );
};

const Card = ({ slug, title, publishedAt, author }: ArticleShape) => {
  return (
    <Link href={`/article/${slug}`} className="w-full">
      <div className="flex flex-row-reverse gap-4 border-b border-zinc-800 px-2 pb-4">
        <figure className="aspect-auto flex-[1] overflow-hidden rounded-sm">
          <img
            src="https://images.unsplash.com/photo-1684457718740-190e844d5cb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1320&q=80"
            alt="alt"
          />
        </figure>
        <div className="flex flex-[2] flex-col justify-between">
          <div>
            <p className="text-sm">
              {dayjs(publishedAt).format("MMM DD, YYYY")}
            </p>
            <h3 className="mb-4 text-xl">
              You Can Now Buy Stepn NFTs on iOS—But You&apos;ll Have to Pay the Apple
              Tax
            </h3>
          </div>
          <div className="flex w-full flex-row items-center justify-between">
            <span>summary</span> <span>3 min read</span>
          </div>
          {/* <p>{props.body}</p> */}
          {/* <p>{props.categories}</p> */}
        </div>
      </div>
    </Link>
  );
};

const Billboard = () => {
  const { data, isLoading: postsLoading } = api.sanity.getAll.useQuery();
  console.log("data:", data);

  if (postsLoading)
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );

  if (!data) return <div>Something went wrong</div>;
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex w-full flex-[2] flex-col gap-4">
        {[...data].slice(0, 1).map((post) => (
          <CardFeature {...post} key={post.slug} />
        ))}
      </div>
      <div className="flex w-full flex-[1] flex-col gap-4">
        {[...data].map((post) => (
          <Card {...post} key={post.slug} />
        ))}
      </div>
      {/* <div className="flex w-full flex-[1] flex-col gap-4">
        {[...data].map((post) => (
          <Card {...post} key={post.slug} />
        ))}
      </div> */}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching asap
  api.posts.getAll.useQuery();

  // Return empty div if user isn't loaded
  if (!userLoaded) return <div />;

  return (
    <>
      <section className="p-4">
        <Billboard />
      </section>
      {/* <section className="p-4">
        <Feed />
      </section> */}
    </>
  );
};

export default Home;
