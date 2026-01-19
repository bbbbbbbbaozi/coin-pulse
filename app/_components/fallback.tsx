import DataTable from "@/components/ui/data-table";

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="header-image sekelton" />
        <div className="info">
          <div className="header-line-sm sekelton" />
          <div className="header-line-lg sekelton" />
        </div>
      </div>
      <div className="chart">
        <div className="chart-skeleton sekelton" />
      </div>
    </div>
  );
};

const columns = [
  {
    header: "Name",
    cell: () => (
      <div className="name-link">
        <div className="name-image sekelton" />
        <div className="name-line sekelton" />
      </div>
    ),
  },
  {
    header: "24h Change",
    cell: () => (
      <div className="price-change">
        <div className="change-icon sekelton" />
        <div className="change-line sekelton" />
      </div>
    ),
  },
  {
    header: "Price",
    cellClassNae: "price-cell",
    cell: () => <div className="price-line sekelton" />,
  },
];

export const TrendingCoinsFallback = () => {
  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <DataTable
        columns={columns}
        data={Array(6).fill({})}
        rowKey={(_, i) => i}
        tableClassName="trending-coins-table"
      />
    </div>
  );
};
