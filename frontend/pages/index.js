import Head from 'next/head';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Typography>Hi there</Typography>
    </Box>
  );
}
