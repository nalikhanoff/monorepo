import Head from 'next/head';
import Link from 'next/link';

import { getCookie } from 'cookies-next';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import createEmotionCache from '../config/createEmotionCache';
import theme from '../config/theme';

import '../styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                component={Link}
                sx={{ flexGrow: 1, textDecoration: 'none' }}
                href="/"
                color="white"
              >
                ErKul Company
              </Typography>
              <Button color="inherit" component={Link} href="/login">
                Вход
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Container maxWidth="xl">
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
