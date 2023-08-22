import Head from 'next/head';

import { SessionProvider } from 'next-auth/react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import Container from '@mui/material/Container';

import AppBar from '../widgets/AppBar';

import createEmotionCache from '../config/createEmotionCache';
import theme from '../config/theme';

import '../styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

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
