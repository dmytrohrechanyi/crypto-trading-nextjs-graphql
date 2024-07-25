import { pubsub } from './pubsub';
import { mockCryptocurrencyData, mockTradingPairsData } from '../mockData';

let userPreferences: string[] = [];

export const resolvers = {
  Query: {
    cryptocurrencies: () => mockCryptocurrencyData,
    tradingPairs: () => mockTradingPairsData,
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
