import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import Cookies from 'js-cookie';
import { SERVER_URL } from '../constants';

const token = Cookies.get('token');
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);
export const isDark = makeVar(false);

const client = new ApolloClient({
  uri: SERVER_URL,
  cache: new InMemoryCache(),
});

export default client;
