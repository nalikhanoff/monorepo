import Head from 'next/head';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export const getServerSideProps = async () => {
  try {
    const { data: products } = await axios('http://localhost:15000/products');
    return { props: { products } };
  } catch (err) {
    return { props: { products: [] } };
  }
};

export default function Home({ products }) {
  return (
    <Container maxWidth="xl">
      <Head>
        <title>Create Next App</title>
      </Head>
      <Grid container spacing={2}>
        {!!products.length &&
          products.map((product) => {
            return (
              <Grid item xs={12} md={4} key={product.id}>
                <Card sx={{ marginTop: 4 }}>
                  {!!product.productImages.length && (
                    <CardMedia
                      sx={{ height: 240 }}
                      image={product.productImages[0].url}
                      title={product.name}
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {product.name}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ display: 'block' }}>
                    <Typography variant="subtitle2">
                      {product.price} тг
                    </Typography>
                    <br />
                    <Button size="small">Подробнее</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
