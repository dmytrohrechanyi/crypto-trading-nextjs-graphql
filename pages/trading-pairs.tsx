import { gql, useQuery } from '@apollo/client';
import type { TradingPair } from '@/types';

const GET_TRADING_PAIRS = gql`
  query GetTradingPairs {
    tradingPairs {
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
  const { loading, error, data } = useQuery(GET_TRADING_PAIRS);

  return (
    <main className="min-h-screen p-12 flex flex-col justify-center items-center">
      {loading && <p>Loading...</p>}
      {error && <p>Fetching failed.</p>}
      {data && (
        <>
          <h1 className="text-5xl text-center mb-12">Trading Pairs</h1>
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
