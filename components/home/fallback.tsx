import DataTable from "@/components/DataTable";
import { cn } from "@/lib/utils";

export const CoinOverviewFallback = () => {
  return (
    <aside id="coin-overview-fallback" className={cn("p-4 rounded-md bg-dark-500")}>
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-48 bg-dark-400 rounded animate-pulse" />
        <div className="h-6 w-24 bg-dark-400 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 h-20 bg-dark-400 rounded animate-pulse" />
        <div className="col-span-2 space-y-2">
          <div className="h-6 w-3/4 bg-dark-400 rounded animate-pulse" />
          <div className="h-6 w-1/2 bg-dark-400 rounded animate-pulse" />
          <div className="h-6 w-5/6 bg-dark-400 rounded animate-pulse" />
        </div>
      </div>
    </aside>
  );
};

const skeletonRows = Array.from({ length: 5 }).map((_, i) => ({
  id: `s-${i}`,
}));

export const TrendingCoinsFallback = () => {
  const columns = [
    {
      header: "Coin",
      cell: () => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-dark-400 animate-pulse" />
          <div className="space-y-1">
            <div className="h-4 w-28 bg-dark-400 rounded animate-pulse" />
            <div className="h-3 w-20 bg-dark-400 rounded animate-pulse" />
          </div>
        </div>
      ),
    },
    {
      header: "Price",
      cell: () => <div className="h-5 w-24 bg-dark-400 rounded animate-pulse" />,
    },
    {
      header: "24h",
      cell: () => <div className="h-5 w-20 bg-dark-400 rounded animate-pulse" />,
    },
    {
      header: "Market Cap",
      cell: () => <div className="h-5 w-28 bg-dark-400 rounded animate-pulse" />,
    },
  ];

  return (
    <section id="trending-coins-fallback" className={cn("w-full rounded-md bg-dark-500 p-4")}>
      <h3 className="mb-3 h-6 w-40 bg-dark-400 rounded animate-pulse" />
      <DataTable
        columns={columns}
        data={skeletonRows}
        rowKey={(r) => r.id}
        tableClassName="w-full"
        headerRowClassName="bg-transparent"
        headerCellClassName="text-muted"
        bodyRowClassName="bg-transparent"
        bodyCellClassName=""
      />
    </section>
  );
};

const fallbackExports = {
  CoinOverviewFallback,
  TrendingCoinsFallback,
};

export default fallbackExports;