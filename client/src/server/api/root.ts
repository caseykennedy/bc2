import { createTRPCRouter } from "~/server/api/trpc";

import { postsRouter } from "./routers/posts";
import { profileRouter } from "./routers/profile";
import { sanityRouter } from "./routers/sanity";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  profile: profileRouter,
  sanity: sanityRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
