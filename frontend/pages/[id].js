import Head from 'next/head';
import Link from 'next/link';

import { useSession } from 'next-auth/react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const { BACKEND_URL } = process.env;

export const getServerSideProps = async ({ params: { id } }) => {
  try {
    const response = await fetch(`${BACKEND_URL}/products/${id}`);
    if (!response.ok) return { notFound: true };

    const product = await response.json();
    return { props: { product } };
  } catch (err) {
    return { notFound: true };
  }
};

export default function Product({ product }) {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>{`ErKul company | ${product.name}`}</title>
      </Head>
      <Grid container sx={{ marginTop: 2 }} spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper elevation={1}>
            <Slider
              slidesToShow={1}
              slidesToScroll={1}
              dots
              infinite
              centerMode
              focusOnSelect
              nextArrow={<KeyboardArrowRight color="primary" />}
              prevArrow={<KeyboardArrowLeft color="primary" />}
            >
              {product.productImages.map((image) => {
                return (
                  <Box key={image.url}>
                    <img
                      src={image.url}
                      style={{ width: '60%' }}
                      alt="Picture"
                    />
                  </Box>
                );
              })}
            </Slider>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="lead">{product.name}</Typography>
            <Typography variant="h4" sx={{ marginTop: 2 }}>
              {product.price} тг
            </Typography>
            {!session?.jwt ? (
              <Button fullWidth variant="outlined" href="tel:87470000000">
                Связаться
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                component={Link}
                href={`/admin/update/${product.id}`}
              >
                Редактировать
              </Button>
            )}
          </Paper>
          <Paper elevation={1} sx={{ p: 2, mt: 1 }}>
            <Typography variant="subtitle2">Описание</Typography>
            <Typography variant="body2">{product.description}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
