import DataTable from "@/components/ui/data-table";

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="header-image skeleton" />
        <div className="info">
          <div className="header-line-sm skeleton" />
          <div className="header-line-lg skeleton" />
        </div>
      </div>
      <div className="chart">
        <div className="chart-skeleton skeleton" />
      </div>
    </div>
  );
};

const columns = [
  {
    header: "Name",
    cell: () => (
      <div className="name-link">
        <div className="name-image skeleton" />
        <div className="name-line skeleton" />
      </div>
    ),
  },
  {
    header: "24h Change",
    cell: () => (
      <div className="price-change">
        <div className="change-icon skeleton" />
        <div className="change-line skeleton" />
      </div>
    ),
  },
  {
    header: "Price",
    cellClassName: "price-cell",
    cell: () => <div className="price-line skeleton" />,
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

const categoriesColumns = [
  {
    header: "Category",
    cellClassName: "category-cell",
    cell: () => <div className="category-skeleton skeleton" />,
  },
  {
    header: "Top Gainers",
    cellClassName: "top-gainers-cell",
    cell: () => (
      <div className="flex items-center gap-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="coin-skeleton skeleton" />
        ))}
      </div>
    ),
  },
  {
    header: "24h Change",
    cellClassName: "change-header-cell",
    cell: () => (
      <div className="change-cell">
        <div className="value-skeleton-sm skeleton" />
        <div className="change-icon skeleton" />
      </div>
    ),
  },
  {
    header: "Market Cap",
    cellClassName: "market-cap-cell",
    cell: () => <div className="value-skeleton-md skeleton" />,
  },
  {
    header: "24h Volume",
    cellClassName: "volume-cell",
    cell: () => <div className="value-skeleton-lg skeleton" />,
  },
];

export const CategoriesFallback = () => {
  return (
    <div id="categories-fallback">
      <h4>Categories</h4>
      <DataTable
        columns={categoriesColumns}
        data={Array(10).fill({})}
        rowKey={(_, i) => i}
        tableClassName="categories-table"
      />
    </div>
  );
};
