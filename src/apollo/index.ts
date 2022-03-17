import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';
import { SERVER_URL, TOKEN_KEY } from '../constants';

const token = Cookies.get(TOKEN_KEY);

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
export const isDark = makeVar(false);

export const userLogout = () => {
  Cookies.remove(TOKEN_KEY);
  isLoggedInVar(false);
  authTokenVar('');
  client.cache.reset();
};

const httpLink = createHttpLink({
  uri: SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'welcoming-token': authTokenVar() || '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
