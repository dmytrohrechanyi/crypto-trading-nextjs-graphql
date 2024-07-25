import { useState } from 'react';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import type { TradingPair } from '@/types';

const GET_TRADING_PAIRS = gql`
  query GetTradingPairs($filter: TradingPairFilterInput) {
    tradingPairs(filter: $filter) {
      baseCurrency
      quoteCurrency
      price
      volume
      liquidity
      DEX
    }
  }
`;

export default function TradingPairs() {
  const [filter, setFilter] = useState<any>({});
  const { loading, error, data, refetch } = useQuery(GET_TRADING_PAIRS, {
    variables: { filter },
  });

  const handleDexFilterChange = (e: any) => {
    setFilter({
      ...filter,
      DEX: e.target.value,
    });
  };

  const handlePriceFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: Number(value),
    });
  };

  const handleFilterSubmit = (e: any) => {
    e.preventDefault();
    refetch(filter);
  };

  return (
    <main className="min-h-screen p-12 flex flex-col justify-center items-center space-y-8">
      <Link href="/">Go to Home</Link>
      {loading && <p>Loading...</p>}
      {error && <p>Fetching failed.</p>}
      {data && (
        <>
          <h1 className="text-5xl text-center">Trading Pairs</h1>
          <form onSubmit={handleFilterSubmit} className="flex space-x-4">
            <input
              type="text"
              name="DEX"
              placeholder="DEX"
              value={filter.DEX}
              className="w-28 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              onChange={handleDexFilterChange}
            />
            <input
              type="number"
              name="minPrice"
              value={filter.minPrice}
              placeholder="Min Price"
              className="w-28 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              onChange={handlePriceFilterChange}
            />
            <input
              type="number"
              name="maxPrice"
              value={filter.maxPrice}
              placeholder="Max Price"
              className="w-28 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              onChange={handlePriceFilterChange}
            />
            <button
              type="submit"
              className="rounded w-20 bg-indigo-600 px-2 py-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Filter
            </button>
          </form>
          <div className="flex gap-8 justify-center">
            {data.tradingPairs.map(
              (
                {
                  baseCurrency,
                  quoteCurrency,
                  price,
                  volume,
                  liquidity,
                  DEX,
                }: TradingPair,
                i: number
              ) => (
                <ul key={baseCurrency + i}>
                  <li>Base Currency: {baseCurrency}</li>
                  <li>Quote Currency: {quoteCurrency}</li>
                  <li>Price: {price}</li>
                  <li>Volume: {volume}</li>
                  <li>Liquidity: {liquidity}</li>
                  <li>DEX: {DEX}</li>
                </ul>
              )
            )}
          </div>
        </>
      )}
    </main>
  );
}
