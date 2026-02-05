import Image from "next/image";
import Link from "next/link";

import { fetcher } from "@/lib/coingecko.action";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";

import CoinsPagination from "@/components/ui/coins-pagination";
import DataTable from "@/components/ui/data-table";

const page = async ({ searchParams }: NextPageProps) => {
  const { page } = await searchParams;

  const perPage = 10;
  const currentPage = Number(page) || 1;

  const coins = await fetcher<CoinMarketData[]>("/coins/markets", {
    vs_currency: "usd",
    per_page: perPage,
    page: Number(page),
  });

  const hasMorePages = perPage === coins.length;
  const estimatedTotalPages =
    currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100;

  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: "Rank",
      cellClassName: "rank-cell",
      cell: (coin) => (
        <>
          #{coin.market_cap_rank}
          <Link href={`/coins/${coin.id}`} aria-label="View coin" />
        </>
      ),
    },
    {
      header: "Token",
      cellClassName: "token-cell",
      cell: (coin) => (
        <div className="token-info">
          <Image
            src={coin.image}
            width={36}
            height={36}
            alt={`${coin.name}'s image`}
            unoptimized
          />
          <p>
            {coin.name} ({coin.symbol.toUpperCase()})
          </p>
        </div>
      ),
    },
    {
      header: "Price",
      cellClassName: "price-cell",
      cell: (coin) => formatCurrency(coin.current_price),
    },
    {
      header: "24h Change",
      cellClassName: "change-cell",
      cell: (coin) => {
        const isTrendingUp = coin.price_change_percentage_24h > 0;

        return (
          <span
            className={cn("change-value", {
              "text-green-600": isTrendingUp,
              "text-red-500": !isTrendingUp,
            })}
          >
            {isTrendingUp && "+"}
            {formatPercentage(coin.price_change_percentage_24h)}
          </span>
        );
      },
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: (coin) => coin.market_cap,
    },
  ];

  return (
    <div id="coins-page" className="custom-scrollbar">
      <h4>All Coins</h4>
      <DataTable
        columns={columns}
        data={coins}
        rowKey={(coin) => coin.id}
        tableClassName="coins-table"
      />

      <CoinsPagination
        currentPage={currentPage}
        totalPages={estimatedTotalPages}
        hasMorePages={hasMorePages}
      />
    </div>
  );
};

export default page;
