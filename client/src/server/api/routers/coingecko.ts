import { TRPCError } from "@trpc/server";
import { type CoinMarket } from "coingecko-api-v3/dist/Interface";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const coingeckoRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      const coins = await ctx.coingecko.coinMarket({
        vs_currency: "usd",
        per_page: 15,
        page: 1,
        ids: "bitcoin, ethereum, chainlink, handshake, litecoin, cosmos, osmosis, uniswap, zcash, cardano",
        sparkline: false,
        price_change_percentage: "24h",
      });

      console.log('coinsReturn:', coins);

      if (!coins) throw new TRPCError({ code: "NOT_FOUND" });

      return coins;

      // return post.map((post) => ({
      //   title: post.title,
      //   name: post.name,
      //   categories: post.categories,
      //   slug: post.slug.current,
      //   author: post.author,
      //   publishedAt: post.publishedAt,
      //   body: post.body,
      // }))
    }),
});
