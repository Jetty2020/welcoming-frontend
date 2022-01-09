import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import { SERVER_URL } from '../constants';

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: SERVER_URL,
  cache: new InMemoryCache(),
});

export default client;
