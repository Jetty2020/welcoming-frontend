import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { CustomThemeProvider } from '@components/common/DarkMode/CustomThemeProvider';
import { client } from '@apollo';

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
