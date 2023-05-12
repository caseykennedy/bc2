import { TRPCError } from "@trpc/server";
import groq from 'groq'
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

interface SanityBody {
  _createAt: string;
  _id: string;
  _rev: string;
  _updateAt: string;
}

interface AuthorShape extends SanityBody {
  name: string
}

export interface ArticleShape extends SanityBody {
  author: AuthorShape
  name: string
  title: string
  publishedAt: string
  body: string
  categories: string[]
  slug: {
    current: string
  }
}

export const sanityRouter = createTRPCRouter({
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const post: ArticleShape = await ctx.sanity.fetch(
        groq`*[_type == "post" && slug.current == $slug][0]{
          title,
          "name": author->name,
          "categories": categories[]->title,
          slug{current},
          author->,
          publishedAt,
          body
        }`,
        { slug: input.slug }
      );

      if (!post) throw new TRPCError({ code: "NOT_FOUND" });

      return {
        title: post.title,
        name: post.name,
        categories: post.categories,
        slug: post.slug.current,
        author: post.author,
        publishedAt: post.publishedAt,
        body: post.body,
      }
    }),
});
