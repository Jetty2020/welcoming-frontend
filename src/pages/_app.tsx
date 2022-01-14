import { ApolloProvider } from '@apollo/client';
import { Global, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import client from '../apollo';
import { GlobalStyles, theme } from '../styles/globals';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyles} />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
