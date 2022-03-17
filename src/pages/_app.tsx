import Cookies from 'js-cookie';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { CustomThemeProvider } from '@components/common/DarkMode/CustomThemeProvider';
import client, { isLoggedInVar, authTokenVar } from '@apollo';

function MyApp({ Component, pageProps }: AppProps) {
  const token = Cookies.get('token');

  isLoggedInVar(Boolean(token));
  authTokenVar(token);

  return (
    <ApolloProvider client={client}>
      <CustomThemeProvider>
        <Component {...pageProps} />
      </CustomThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
