import { ApolloProvider } from '@apollo/client';
import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import client from '../apollo';
import { GlobalStyles } from '../styles/globals';
import { CustomThemeProvider } from '../styles/CustomThemeProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <CustomThemeProvider>
        <Component {...pageProps} />
      </CustomThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
