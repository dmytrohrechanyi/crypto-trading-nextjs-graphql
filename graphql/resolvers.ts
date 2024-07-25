import { pubsub } from './pubsub';
import { mockCryptocurrencyData, mockTradingPairsData } from '../mockData';

export const resolvers = {
  Query: {
    cryptocurrencies: () => mockCryptocurrencyData,
    tradingPairs: () => mockTradingPairsData,
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
