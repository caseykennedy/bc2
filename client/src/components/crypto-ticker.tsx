import {
  CoinGeckoClient,
  type CoinItem,
  type CoinMarket,
  type TrendingItem,
} from "coingecko-api-v3";
import React, { useEffect, useState } from "react";

const Coin = ({ name, image, current_price }: CoinMarket) => {
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
    <div className="flex flex-1 flex-row items-center gap-2 bg-zinc-950 px-4 py-3 text-sm">
      <div className="flex items-center justify-center overflow-hidden rounded-full bg-zinc-700">
        <img width="24px" height="24px" src={image} alt={name} />
      </div>
      <div className="flex flex-col">
        <div className="coin-title">
          <div className="text-zinc-400">{name}</div>
        </div>
        <div className="coin-info">
          <div className="coin-info__price">{current_price}</div>
          {/* <div className="coin-info__carat">{carat}</div> */}
          {/* <div className="coin-info__change">{currentChange.toFixed(2)}%</div> */}
        </div>
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
          ids: 'bitcoin, ethereum, chainline, handshake, litecoin, cardano',
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
    <div className="flex w-full flex-row items-center justify-center border-b border-zinc-800 bg-zinc-900">
      <div className="flex grow flex-row gap-[1px]">
        {!isLoading ? (
          data?.map((value, idx) => <Coin {...value} key={idx} />)
        ) : (
          <div className="is-loading">loading...</div>
        )}
      </div>
    </div>
  );
};

export default CryptoTicker;
