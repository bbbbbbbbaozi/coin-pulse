"use server";

import qs from "query-string";
import { ProxyAgent } from "undici";

const COINGECKO_BASE_URL = process.env.COINGECKO_BASE_URL;
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

if (!COINGECKO_BASE_URL) throw new Error("Could not get base url");
if (!COINGECKO_API_KEY) throw new Error("Could not get api key");

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

  const proxyUrl = "http://127.0.0.1:7890";
  const dispatcher = new ProxyAgent(proxyUrl);

  const response = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": COINGECKO_API_KEY,
      "Content-Type": "application/json",
    } as Record<string, string>,
    next: { revalidate },

    // 添加这一行注释，TS 就会闭嘴
    // @ts-expect-error - undici dispatcher is supported in Node.js environment
    dispatcher: dispatcher,
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => {});
    throw new Error(
      `API Error: ${response.status}, ${errorBody.error || response.statusText}`,
    );
  }

  return response.json();
}
