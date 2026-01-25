'use client';
import { Separator } from '@/components/ui/separator';
import CandlestickChart from '@/components/CandlestickChart';
// import { useCoinGeckoWebSocket } from '@/hooks/useCoinGeckoWebSocket';
// import DataTable from '@/components/DataTable';
import { formatCurrency } from '@/lib/utils';
// import { useState } from 'react';
import CoinHeader from '@/components/CoinHeader';
import Image from "next/image";

const CoinDataWrapper = ({ coinId, coin, coinOHLCData }: LiveDataProps) => {

  return (
    <section id="live-data-wrapper">
      <CoinHeader
        name={coin.name}
        image={coin.image.large}
        livePrice={coin.market_data.current_price.usd}
        livePriceChangePercentage24h={
            coin.market_data.price_change_percentage_24h
        }
        priceChangePercentage30d={coin.market_data.price_change_percentage_30d}
        priceChange24h={coin.market_data.price_change_24h_in_currency.usd}
      />
      <Separator className="divider" />

      <div className="trend">
          <CandlestickChart data={coinOHLCData} coinId="bitcoin" liveInterval={'1s'} setLiveInterval={function (interval: '1s' | '1m'): void {
                  throw new Error('Function not implemented.');
              } }>
              <div className="header pt-2">
                  <Image
                    src={coin.image.large}
                    alt={coin.name}
                    width={56}
                    height={56}
                  ></Image>
                  <div className="Info">
                  <p>
                      {coin.name} / {coin.symbol.toUpperCase()}
                  </p>
                  <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
              </div>
            </div>
          </CandlestickChart>
      </div>

      {/* <Separator className="divider" /> */}
{/* 
      {tradeColumns && (
        <div className="trades">
          <h4>Recent Trades</h4>

          <DataTable
            columns={tradeColumns}
            data={data}
            rowKey={(_, index) => index}
            tableClassName="trades-table"
          />
        </div>
      )} */}
    </section>
  );
};

export default CoinDataWrapper;