import { pubsub } from './pubsub';
import { mockCryptocurrencyData, mockTradingPairsData } from '../mockData';

let userPreferences: string[] = [];

export const resolvers = {
  Query: {
    cryptocurrencies: () => mockCryptocurrencyData,
    tradingPairs: (_: any, { filter }: { filter: any }) => {
      let filteredPairs = mockTradingPairsData;

      if (filter) {
        const { DEX, minPrice, maxPrice } = filter;
        if (DEX) {
          filteredPairs = filteredPairs.filter((pair) => pair.DEX === DEX);
        }

        if (minPrice !== undefined) {
          filteredPairs = filteredPairs.filter(
            (pair) => pair.price >= minPrice
          );
        }

        if (maxPrice !== undefined) {
          filteredPairs = filteredPairs.filter(
            (pair) => pair.price <= maxPrice
          );
        }
      }

      return filteredPairs;
    },
  },
  Mutation: {
    saveUserPreferences: (
      _: any,
      { preferences }: { preferences: string[] }
    ) => {
      userPreferences = preferences;
      return true;
    },
  },
  Subscription: {
    priceUpdated: {
      subscribe: () => pubsub.asyncIterator(['PRICE_UPDATED']),
    },
  },
};

setInterval(() => {
  const updatedCrypto = {
    ...mockCryptocurrencyData[0],
    price: Math.random() * 100000,
  };
  pubsub.publish('PRICE_UPDATED', { priceUpdated: updatedCrypto });
}, 1000);
