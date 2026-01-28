import React from 'react';
import DataTable from '@/components/DataTable';
import { cn } from '@/lib/utils';

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback" className="rounded-3xl bg-zinc-900 border border-zinc-800 p-8 flex flex-col gap-8 h-full">
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

export const TrendingCoinsFallback = () => {
  const columns = [
    {
      header: 'Name',
      cell: () => (
        <div className="name-link">
          <div className="name-image skeleton" />
          <div className="name-line skeleton" />
        </div>
      ),
    },
    {
      header: '24h Change',
      cell: () => (
        <div className="price-change">
          <div className="change-icon skeleton" />
          <div className="change-line skeleton" />
        </div>
      ),
    },
    {
      header: 'Price',
      cell: () => <div className="price-line skeleton" />,
    },
  ];

  const dummyData = Array.from({ length: 6 }, (_, i) => ({ id: i }));

  return (
    <div id="trending-coins-fallback" className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6">
      <h4 className="text-xl font-bold text-zinc-100 mb-4">Trending Coins</h4>
      <DataTable
        data={dummyData}
        columns={columns}
        rowKey={(item) => item.id}
        tableClassName="trending-coins-table"
      />
    </div>
  );
};

export const CategoriesFallback = () => {
  const columns = [
    {
      header: 'Category',
      cellClassName: 'category-cell',
      cell: () => <div className="category-line skeleton" />,
    },
    {
      header: 'Top Gainers',
      cellClassName: 'top-gainers-cell',
      cell: () => (
        <div className="flex gap-1">
          <div className="gainer-image skeleton" />
          <div className="gainer-image skeleton" />
          <div className="gainer-image skeleton" />
        </div>
      ),
    },
    {
      header: '24h Change',
      cellClassName: 'change-header-cell',
      cell: () => (
        <div className="change-cell">
          <div className="change-icon skeleton" />
          <div className="change-line skeleton" />
        </div>
      ),
    },
    {
      header: 'Market Cap',
      cellClassName: 'market-cap-cell',
      cell: () => <div className="value-skeleton-lg skeleton" />,
    },
    {
      header: '24h Volume',
      cellClassName: 'volume-cell',
      cell: () => <div className="value-skeleton-md skeleton" />,
    },
  ];

  const dummyData = Array.from({ length: 10 }, (_, i) => ({ id: i }));

  return (
    <div id="categories-fallback" className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6">
      <h4 className="text-xl font-bold text-zinc-100 mb-4">Top Categories</h4>
      <DataTable
        data={dummyData}
        columns={columns}
        rowKey={(item) => item.id}
        tableClassName="mt-3"
      />
    </div>
  );
};