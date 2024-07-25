import { Inter } from 'next/font/google';
import { gql, useQuery } from '@apollo/client';

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

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { loading, error, data } = useQuery(GET_CRYPTOCURRENCIES);

  return (
    <main
      className={`min-h-screen p-12 flex flex-col justify-center items-center ${inter.className}`}
    >
      {loading && <p>Loading...</p>}
      {error && <p>Fetching failed.</p>}
      {data && (
        <>
          <h1 className="text-5xl text-center mb-12">Cryptocurrencies</h1>
          <div className="flex gap-8 justify-center">
            {data.cryptocurrencies.map((crypto: any) => (
              <ul key={crypto.id}>
                <li>Name: {crypto.name}</li>
                <li>Symbol: {crypto.symbol}</li>
                <li>Price: {crypto.price}</li>
                <li>Market Cap: {crypto.marketCap}</li>
                <li>Volume: {crypto.volume}</li>
                <li>Change (24h): {crypto.change24h}%</li>
                <li>All-Time High: {crypto.allTimeHigh}</li>
                <li>Total Supply: {crypto.totalSupply}</li>
                <li>DEX List: {crypto.dexList.join(', ')}</li>
              </ul>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
