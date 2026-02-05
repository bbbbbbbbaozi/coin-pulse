import { Suspense } from "react";

import CoinOverview from "./_components/coin-overview";
import TrendingCoins from "./_components/trending-coins";
import {
  CategoriesFallback,
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from "./_components/fallback";
import Categories from "./_components/categories";

const Page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>

        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>

      <section className="w-full mt-7 space-y-4">
        <Suspense fallback={<CategoriesFallback />}>
          <Categories />
        </Suspense>
      </section>
    </main>
  );
};

export default Page;
