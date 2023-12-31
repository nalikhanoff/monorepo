import { useState, useRef } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ImageField from 'features/Product/ui/ImageField';
import { InitialStateOfProduct } from 'entities/Product/config/InitialStateOfProduct';
import { createProduct, updateProduct } from 'shared/api/product';

export default function ProductForm({ isUpdate = false, initialProductState }) {
  const [product, setProduct] = useState(
    isUpdate ? initialProductState : InitialStateOfProduct,
  );

  const handleTextChange = useRef(function (e) {
    const { name, value } = e.target;
    setProduct((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  });

  const handleChangeImageField = useRef((e) => {
    const { idx } = e.currentTarget.dataset;
    const { name, value } = e.target;
    setProduct((prevValue) => {
      const newProductImages = [...prevValue.productImages];
      newProductImages[+idx][name] = value;
      return {
        ...prevValue,
        productImages: newProductImages,
      };
    });
  });

  const handleChangeMainImage = useRef((e) => {
    const { idx } = e.currentTarget.dataset;
    const { checked } = e.target;

    setProduct((prevValue) => {
      const newProductImages = prevValue.productImages.map((img) => {
        img.isMainImage = false;
        return img;
      });
      newProductImages[+idx].isMainImage = checked;
      return {
        ...prevValue,
        productImages: newProductImages,
      };
    });
  });

  const handleAddImageField = useRef(() => {
    setProduct((prevValue) => {
      return {
        ...prevValue,
        productImages: [
          ...prevValue.productImages,
          {
            url: '',
            isValidImage: false,
            isMainImage: false,
          },
        ],
      };
    });
  });

  const handleDeleteImageField = useRef((e) => {
    const { idx } = e.currentTarget.dataset;
    setProduct((prevValue) => {
      const newProductImages = [...prevValue.productImages];
      newProductImages.splice(+idx, 1);
      return {
        ...prevValue,
        productImages: newProductImages,
      };
    });
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          if (isUpdate) {
            await updateProduct(product);
            return;
          }
          await createProduct(product);

          setProduct({
            name: '',
            description: '',
            price: '',
            productImages: [
              {
                url: '',
                isValidImage: false,
                isMainImage: false,
              },
            ],
          });
        } catch (err) {
          console.log(err);
        }
      }}
    >
      <Grid container sx={{ marginTop: 2 }} spacing={2}>
        <Grid item xs={12}>
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
        <Grid item xs={12} container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ mb: 2 }}>Изображения продукта</Typography>
            <Button onClick={handleAddImageField.current}>
              Добавить изображение
            </Button>
          </Grid>
          {product.productImages.map((image, idx) => {
            return (
              <Grid item xs={4} key={idx}>
                <ImageField
                  idx={idx}
                  value={image.url}
                  isValidImage={image.isValidImage}
                  isMainImage={image.isMainImage}
                  onChange={handleChangeImageField.current}
                  onDelete={handleDeleteImageField.current}
                  onChangeMainImage={handleChangeMainImage.current}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid container sx={{ my: 2 }}>
        <Grid>
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
