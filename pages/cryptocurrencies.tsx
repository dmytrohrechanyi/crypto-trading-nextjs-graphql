import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import type { Cryptocurrency } from '@/types';

const GET_CRYPTOCURRENCIES = gql`
  query GetCryptocurrencies {
    cryptocurrencies {
      id
      symbol
      name
      price
      marketCap
      volume
      change24h
      allTimeHigh
      totalSupply
      dexList
    }
  }
`;

export default function Cryptocurrencies() {
  const { loading, error, data } = useQuery(GET_CRYPTOCURRENCIES);

  return (
    <main className="min-h-screen p-12 flex flex-col justify-center items-center space-y-8">
      <Link href="/">Go to Home</Link>
      {loading && <p>Loading...</p>}
      {error && <p>Fetching failed.</p>}
      {data && (
        <>
          <h1 className="text-5xl text-center">Cryptocurrencies</h1>
          <div className="flex gap-8 justify-center">
            {data.cryptocurrencies.map(
              ({
                id,
                name,
                symbol,
                price,
                marketCap,
                volume,
                change24h,
                allTimeHigh,
                totalSupply,
                dexList,
              }: Cryptocurrency) => (
                <ul key={id}>
                  <li>Name: {name}</li>
                  <li>Symbol: {symbol}</li>
                  <li>Price: {price}</li>
                  <li>Market Cap: {marketCap}</li>
                  <li>Volume: {volume}</li>
                  <li>Change (24h): {change24h}%</li>
                  <li>All-Time High: {allTimeHigh}</li>
                  <li>Total Supply: {totalSupply}</li>
                  <li>DEX List: {dexList.join(', ')}</li>
                </ul>
              )
            )}
          </div>
        </>
      )}
    </main>
  );
}
