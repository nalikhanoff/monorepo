import { useState, useRef } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import ImageField from 'features/Product/ui/ImageField';

export default function CreateProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    productImages: [{ url: '' }],
  });

  const handleTextChange = useRef(function (e) {
    const { name, value } = e.target;
    setProduct((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  });
  return (
    <form>
      <Grid container sx={{ marginTop: 2 }} spacing={2}>
        <Grid item xs={5}>
          <TextField
            placeholder="Название"
            fullWidth
            name="name"
            onChange={handleTextChange.current}
            value={product.name}
          />
          <TextField
            placeholder="Описание"
            fullWidth
            multiline
            sx={{ marginTop: 2 }}
            maxRows={Infinity}
            minRows={3}
            name="description"
            onChange={handleTextChange.current}
            value={product.description}
          />
          <TextField
            placeholder="Цена"
            sx={{ marginTop: 2 }}
            fullWidth
            type="number"
            name="price"
            onChange={handleTextChange.current}
            value={product.price}
          />
        </Grid>
        <Grid item xs={7}>
          {product.productImages.map((image, idx) => {
            return (
              <ImageField value={image.url} key={idx} isValidImage={false} />
            );
          })}
        </Grid>
      </Grid>
    </form>
  );
}
