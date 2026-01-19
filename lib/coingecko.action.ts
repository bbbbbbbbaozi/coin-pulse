"use server";

import qs from "query-string";
import { ProxyAgent } from "undici";

const COINGECKO_BASE_URL = process.env.COINGECKO_BASE_URL;
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;
const PROXY_URL = process.env.PROXY_URL;

if (!COINGECKO_BASE_URL)
  throw new Error("COINGECKO_BASE_URL is not configured");
if (!COINGECKO_API_KEY) throw new Error("COINGECKO_API_KEY is not configured");

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${COINGECKO_BASE_URL}${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const dispatcher = PROXY_URL ? new ProxyAgent(PROXY_URL) : undefined;

  const response = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": COINGECKO_API_KEY,
      "Content-Type": "application/json",
    } as Record<string, string>,
    next: { revalidate },

    ...(dispatcher && { dispatcher }),
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => {});
    throw new Error(
      `API Error: ${response.status}, ${errorBody.error || response.statusText}`,
    );
  }

  return response.json();
}
