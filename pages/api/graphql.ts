import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '../../graphql/schema';
import { resolvers } from '../../graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: '/api/graphql',
  },
});

export default startServerAndCreateNextHandler(server);
