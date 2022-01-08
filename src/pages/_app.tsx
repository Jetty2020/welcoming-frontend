import { ApolloProvider } from '@apollo/client';
import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import client from '../apollo';
import { GlobalStyles } from '../styles/globals';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Global styles={GlobalStyles} />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
