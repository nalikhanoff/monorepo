import Head from 'next/head';

import { SessionProvider } from 'next-auth/react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import Container from '@mui/material/Container';

import AppBar from 'widgets/AppBar';

import createCache from 'shared/config/emotionCache';
import theme from 'shared/themes';

import '../styles/globals.css';

const clientSideEmotionCache = createCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}) {
  return (
    <CacheProvider value={emotionCache}>
      <SessionProvider session={session}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AppBar />
          <Container maxWidth="xl">
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </SessionProvider>
    </CacheProvider>
  );
}

export default MyApp;
