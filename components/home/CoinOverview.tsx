import { fetcher } from "@/lib/coingecko.actions";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { CoinOverviewFallback } from "./fallback";
import CoinOverviewChartClient from "./CoinOverviewChartClient";

const CoinOverview = async () => {

  try {
    const [coin, coinOHLCData] = await Promise.all([
      await fetcher<CoinDetailsData>("coins/bitcoin", {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      }),
      await fetcher<OHLCData[]>("coins/bitcoin/ohlc", {
        vs_currency: "usd",
        days: 1,
      }),
    ])

    if (!coin || !coin.image?.large || !coin.market_data?.current_price?.usd) {
      console.error("Missing coin data:", coin);
      return <CoinOverviewFallback />;
    }

    return (  
      <div id="coin-overview" className="rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 shadow-lg p-6 flex flex-col gap-6">
        <div className="flex items-center gap-4 border-b border-zinc-700 pb-4 mb-4">
          <Image
            src={coin.image.large}
            alt={coin.name}
            width={64}
            height={64}
            className="rounded-full border-2 border-yellow-400 bg-zinc-950"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-yellow-400">{coin.name}</span>
              <span className="uppercase text-zinc-400 text-lg font-mono">({coin.symbol})</span>
            </div>
            <div className="text-zinc-300 mt-1 text-sm">Rank #{coin.market_cap_rank}</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-white">{formatCurrency(coin.market_data.current_price.usd)}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${coin.market_data.price_change_percentage_24h > 0 ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
            {coin.market_data.price_change_percentage_24h > 0 ? '+' : ''}{coin.market_data.price_change_percentage_24h.toFixed(2)}%
          </span>
        </div>
        <CoinOverviewChartClient data={coinOHLCData} coinId="bitcoin">
          <></>
        </CoinOverviewChartClient>
      </div>
    );
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return <CoinOverviewFallback />;
  }
};

export default CoinOverview;
