import "swiper/swiper.min.css";

import { CoinGeckoClient, type CoinMarket } from "coingecko-api-v3";
import React, { useCallback, useEffect, useState } from "react";

import { api } from "~/utils/api";
import { client } from "~/utils/coingecko";

import Marquee from "./marquee";

const Coin = ({
  name,
  image,
  current_price,
  price_change_percentage_24h,
  symbol,
}: CoinMarket) => {
  const currentChange = price_change_percentage_24h;

  console.log("currentChange: ", currentChange);

  let color;
  let carat;
  const currentChangeFixed = currentChange?.toFixed(2);
  if (currentChangeFixed?.toString().startsWith("-")) {
    color = "text-red-500";
    carat = ``;
  } else {
    color = "text-primary-500";
    carat = `+`;
  }
  return (
    <div className="flex flex-row flex-nowrap items-center justify-center gap-2 px-4 py-3 text-sm opacity-70 hover:opacity-100">
      <div className="flex h-[24px] w-[24px] items-center justify-center overflow-hidden rounded-full border border-zinc-600 bg-zinc-900">
        <img width="22px" height="22px" src={image} alt={name} />
      </div>
      <div className="flex flex-row gap-2">
        <div className="whitespace-nowrap uppercase">{symbol}</div>

        <div className="text-zinc-400">${current_price?.toFixed(2)}</div>

        <div className={`${color}`}>
          {carat}
          {price_change_percentage_24h?.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

const CryptoTicker = () => {
  // const { data: apiData, isLoading: apiLoading } =
  //   api.coingecko.getAll.useQuery();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CoinMarket[]>();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await client.coinMarket({
        vs_currency: "usd",
        per_page: 10,
        page: 1,
        ids: "bitcoin, ethereum, chainlink, handshake, litecoin, cosmos, osmosis, uniswap, zcash, cardano",
        sparkline: false,
        price_change_percentage: "24h",
      });

      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  return (
    <div className="flex w-full flex-row items-center overflow-hidden border-b border-t border-zinc-800 bg-black">
      {!isLoading ? (
        <Marquee speed={40}>
          {data?.map((value, idx) => (
            <Coin {...value} key={idx} />
          ))}
        </Marquee>
      ) : (
        <div className="is-loading flex px-4 py-3 text-sm text-zinc-600">
          loading...
        </div>
      )}
    </div>
  );
};

export default CryptoTicker;
