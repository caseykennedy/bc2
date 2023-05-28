import "swiper/swiper.min.css";

import {
  CoinGeckoClient,
  type CoinItem,
  type CoinMarket,
  type TrendingItem,
} from "coingecko-api-v3";
import React, { useEffect, useState } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Marquee from "./marquee";

const Coin = ({
  name,
  image,
  current_price,
  price_change_percentage_24h,
}: CoinMarket) => {
  // const currentChange = coin.price_change_percentage_24h;

  // let color;
  // let carat;
  // if (typeof parseFloat(currentChange) === "number") {
  //   const currentChangeFixed = currentChange.toFixed(2);
  //   if (currentChangeFixed.toString(2).startsWith("-")) {
  //     color = theme.colors.red;
  //     carat = ``;
  //   } else {
  //     color = theme.colors.primary;
  //     carat = `+`;
  //   }
  // }
  return (
    <div className="flex flex-row flex-nowrap items-center justify-center gap-2 px-8 py-3 text-sm">
      <div className="flex h-[24px] w-[24px] items-center justify-center overflow-hidden rounded-full border border-zinc-600 bg-zinc-900">
        <img width="24px" height="24px" src={image} alt={name} />
      </div>
      <div className="flex flex-row gap-2">
        <div className="whitespace-nowrap text-zinc-400">{name}</div>

        <div className="">{current_price}</div>

        <div className="">{price_change_percentage_24h?.toFixed(2)}%</div>
      </div>
    </div>
  );
};

const CryptoTicker = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CoinMarket[]>();

  useEffect(() => {
    const client = new CoinGeckoClient({
      timeout: 10000,
      autoRetry: true,
    });

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await client.coinMarket({
          vs_currency: "usd",
          per_page: 15,
          page: 1,
          ids: "bitcoin, ethereum, chainlink, handshake, litecoin, cosmos, osmosis, uniswap, zcash, cardano",
          sparkline: false,
          price_change_percentage: "24h",
        });
        console.log("res:", res);

        const coins = res;

        setData(coins);

        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    console.log("Trending Data:", data);
  }, [data]);

  return (
    <div className="flex w-full flex-row items-center overflow-hidden border-b border-zinc-800 bg-zinc-950">
      <Marquee>
        {!isLoading ? (
          data?.map((value, idx) => <Coin {...value} key={idx} />)
        ) : (
          <div className="is-loading py-3">loading...</div>
        )}
      </Marquee>
    </div>
  );
};

export default CryptoTicker;
