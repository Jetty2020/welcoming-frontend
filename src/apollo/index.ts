import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
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

export const client = new ApolloClient({
  uri: SERVER_URL,
  cache: new InMemoryCache(),
});
