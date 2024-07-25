import { pubsub } from './pubsub';
import { mockCryptocurrencyData, mockTradingPairsData } from '../mockData';

const inMemoryUserPreferences: {
  cryptocurrencies: string[];
  tradingPairs: string[];
} = {
  cryptocurrencies: [],
  tradingPairs: [],
};

const isValidSymbol = (symbol: string) => {
  return mockCryptocurrencyData.some((crypto) => crypto.symbol === symbol);
};

const isValidTradingPair = (pair: string) => {
  const [base, quote] = pair.split('-');
  return isValidSymbol(base) && isValidSymbol(quote) && base !== quote;
};

export const resolvers = {
  Query: {
    cryptocurrencies: () => mockCryptocurrencyData,
    tradingPairs: (_: any, { filter }: { filter: any }) => {
      let filteredPairs = mockTradingPairsData;

      if (filter) {
        const { tradingPair, DEX, minPrice, maxPrice } = filter;
        if (tradingPair && tradingPair.split('-').length === 2) {
          const [base, quote] = tradingPair.split('-');
          filteredPairs = filteredPairs.filter(
            (pair) => pair.baseCurrency === base && pair.quoteCurrency === quote
          );
        }

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
    userPreferences: () => inMemoryUserPreferences,
  },
  Mutation: {
    saveUserPreferences: (
      _: any,
      { input }: { input: { userPreferences: string[] } }
    ) => {
      const { userPreferences } = input;
      for (const preference of userPreferences) {
        if (preference.split('-').length === 1) {
          if (!isValidSymbol(preference)) {
            throw new Error(`Invalid cryptocurrency symbol: ${preference}`);
          }

          inMemoryUserPreferences.cryptocurrencies.push(preference);
        } else if (preference.split('-').length === 2) {
          if (!isValidTradingPair(preference)) {
            throw new Error(`Invalid trading pair: ${preference}`);
          }

          inMemoryUserPreferences.tradingPairs.push(preference);
        } else {
          throw new Error(`Invalid input: ${preference}`);
        }
      }

      return inMemoryUserPreferences;
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
