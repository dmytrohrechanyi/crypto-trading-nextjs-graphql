import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Cryptocurrency {
    id: ID!
    symbol: String!
    name: String!
    price: Float!
    marketCap: Float!
    volume: Float!
    change24h: Float!
    allTimeHigh: Float!
    totalSupply: Float!
    dexList: [String!]!
  }

  type TradingPair {
    baseCurrency: String!
    quoteCurrency: String!
    price: Float!
    volume: Float!
    liquidity: Float!
    DEX: String!
  }

  type Query {
    cryptocurrencies: [Cryptocurrency!]!
    tradingPairs: [TradingPair!]!
  }

  type Subscription {
    priceUpdated: Cryptocurrency
  }
`;
