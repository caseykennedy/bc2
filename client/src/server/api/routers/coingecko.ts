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
        per_page: 10,
        page: 1,
        ids: "bitcoin, ethereum, chainlink, handshake, litecoin, cosmos, osmosis, uniswap, zcash, cardano",
        sparkline: false,
        price_change_percentage: "24h",
      });

      console.log('coinsReturn:', coins);

      if (!coins) throw new TRPCError({ code: "NOT_FOUND" });

      return coins.map((coin) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: coin.image,
        current_price: coin.current_price,
        market_cap: coin.market_cap,
        market_cap_rank: coin.market_cap_rank,
        fully_diluted_valuation: coin.fully_diluted_valuation,
        total_volume: coin.total_volume,
        high_24h: coin.high_24h,
        low_24h: coin.low_24h,
        price_change_24h: coin.price_change_24h,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        market_cap_change_24h: coin.market_cap_change_24h,
        market_cap_change_percentage_24h: coin.market_cap_change_percentage_24h,
        circulating_supply: coin.circulating_supply,
        total_supply: coin.total_supply,
        max_supply: coin.max_supply,
        ath: coin.ath,
        ath_change_percentage: coin.ath_change_percentage,
        ath_date: coin.ath_date,
        atl: coin.atl,
        atl_change_percentage: coin.atl_change_percentage,
        atl_date: coin.atl_date,
        last_updated: coin.last_updated,
      }));

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
