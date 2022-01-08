import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: 'http://localhost:5050/graphql',
  cache: new InMemoryCache(),
});

export default client;
