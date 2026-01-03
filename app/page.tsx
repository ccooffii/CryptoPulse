import React from 'react'
import Image from 'next/image'
import DataTable from '@/components/DataTable'
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const columns: DataTableColumn<TrendingCoin>[] = [
    {
        header: 'Name',
        cellClassName: 'name-cell',
        cell: (coin) => {
            const item = coin.item;
            return (
                <Link href={`/coins/${item.id}`} className="flex items-center gap-3">
                    <Image src={item.large} alt={item.name} width={36} height={36} />
                    <p>{item.name}</p>
                </Link>
            );
        },
    },
    {
        header: '24h Change',
        cellClassName: 'name-cell',
        cell: (coin) => {
            const item = coin.item;
            const isTrendingUp = item.data.price_change_percentage_24h.usd >= 0;
            return (
                <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
                    <p>
                        {isTrendingUp ? (<TrendingUp width={16} height={16} />) : (<TrendingDown width={16} height={16} />)}
                        {Math.abs(item.data.price_change_percentage_24h.usd).toFixed(2)}%
                    </p>
                </div>
            )
        }
    },
    {
        header: 'Price',
        cellClassName: 'price-cell',
        cell: (coin) => coin.item.data.price,
    }
]

const dummyTrending: TrendingCoin[] = [
  {
    item: {
        id: "bitcoin",
        name: "Bitcoin",
        large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
        data: {
            price_change_percentage_24h: { usd: 2.15 },
            price: 89113.0,
        },
        symbol: '',
        market_cap_rank: 0,
        thumb: ''
    },
  },
  {
    item: {
        id: "ethereum",
        name: "Ethereum",
        large: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
        data: {
            price_change_percentage_24h: { usd: -1.42 },
            price: 3780.5,
        },
        symbol: '',
        market_cap_rank: 0,
        thumb: ''
    },
  },
];

const page = () => {
  return (
    <main className="main-container">

        <section className="home-grid">
            <div id="coin-overview">
                <div className="header pt-2">
                    <Image 
                        src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" 
                        alt="Bitcoin"
                        width={56}
                        height={56}
                    ></Image>
                    <div className="Info">
                        <p>Bitcoin / BTC</p>
                        <h1>$89,113.00</h1>
                    </div>
                </div>
            </div>
            <p>Trending Coins</p>
            <DataTable data={dummyTrending} columns={columns} rowKey={(row) => row.item.id} />
        </section>

        <section className="w-full mt-7 space-y-4">
            <p>Categories</p>
        </section>

    </main>
  )
}

export default page