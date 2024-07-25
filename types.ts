export type Cryptocurrency = {
  id: number;
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  volume: number;
  change24h: number;
  allTimeHigh: number;
  totalSupply: number;
  dexList: string[];
};

export type TradingPair = {
  baseCurrency: string;
  quoteCurrency: string;
  price: number;
  volume: number;
  liquidity: number;
  DEX: string;
};
