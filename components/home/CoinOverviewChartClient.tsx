"use client";
import { useState, ReactNode } from "react";
import CandlestickChart from "../CandlestickChart";

interface CoinOverviewChartClientProps {
  data: OHLCData[];
  coinId: string;
  children: ReactNode;
}

export default function CoinOverviewChartClient({ data, coinId, children }: CoinOverviewChartClientProps) {
  const [liveInterval, setLiveInterval] = useState<"1s" | "1m">("1m");
  return (
    <CandlestickChart
      data={data}
      coinId={coinId}
      liveInterval={liveInterval}
      setLiveInterval={setLiveInterval}
    >
      {children}
    </CandlestickChart>
  );
}
