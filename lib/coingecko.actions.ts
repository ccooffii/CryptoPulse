/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import qs from "query-string";

function getEnv() {
  const base = process.env.COINGECKO_BASEURL?.replace(/\/+$/, "");
  const key = process.env.COINGECKO_API_KEY;

  if (!base) throw new Error("Missing env: COINGECKO_BASEURL");
  if (!key) throw new Error("Missing env: COINGECKO_API_KEY");

  return { base, key };
}

export async function fetcher<T>(
  endpoint: string,
  params?: Record<string, any>,
): Promise<T> {
  const { base, key } = getEnv();

  const cleanEndpoint = endpoint.replace(/^\/+/, "");
  const url = qs.stringifyUrl(
    { url: `${base}/${cleanEndpoint}`, query: params },
    { skipEmptyString: true, skipNull: true },
  );

  const res = await fetch(url, {
    headers: {
      // ✅ Demo key 用这个 header
      "x-cg-demo-api-key": key,
    },
    // 按需：实时数据用 no-store；榜单可用 revalidate
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`CoinGecko error ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
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
  return data.coins;
}