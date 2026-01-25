/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import qs from "query-string";

const BASE_URL = process.env.COINGECKO_BASEURL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error("Could not get base url");
if (!API_KEY) throw new Error("Could not get api key");

export async function fetcher<T>(
  endpoint: string,
  params?: Record<string, any>,
): Promise<T> {
  const cleanEndpoint = endpoint.replace(/^\/+/, "");
  const base = process.env.COINGECKO_BASEURL!.replace(/\/+$/, "");

  const url = qs.stringifyUrl(
    { url: `${base}/${cleanEndpoint}`, query: params },
    { skipEmptyString: true, skipNull: true },
  );
  const res = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": process.env.COINGECKO_API_KEY!,
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`API Error ${res.status}: ${body || res.statusText}`);
  }
  return res.json();
}

export type SearchCoin = {
  id: string,
  name: string,
  api_symbol: string,
  symbol: string,
  market_cap_rank: number,
  thumb: string,
  large: string,
};

type CoinGeckoSearchResponse = {
  coins: SearchCoin[];
};

export async function searchCoins(query: string): Promise<SearchCoin[]> {
  const q = query.trim();
  if (!q) return [];
  const data = await fetcher<CoinGeckoSearchResponse>(`/search?query=${q}`,{method: 'GET'});
  console.log(data.coins);
  return data.coins;
}