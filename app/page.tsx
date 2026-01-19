import { Suspense } from "react";

import CoinOverview from "./_components/coin-overview";
import TrendingCoins from "./_components/trending-coins";
import {
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from "./_components/fallback";

const Page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid"></section>

      <Suspense fallback={<CoinOverviewFallback />}>
        <CoinOverview />
      </Suspense>

      <Suspense fallback={<TrendingCoinsFallback />}>
        <TrendingCoins />
      </Suspense>

      <section className="w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
};

export default Page;
