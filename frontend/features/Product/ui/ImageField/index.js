import { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';

import { checkImage } from 'features/Product/lib';
import useDebounce from 'shared/hooks/useDebounceFn';

export default function ImageField({
  onChange,
  onDelete,
  value,
  isMainImage,
  onChangeMainImage,
  idx,
}) {
  const [isValidImage, setValidImage] = useState(false);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (debouncedValue) {
      checkImage(debouncedValue)
        .then((res) => {
          setValidImage(res.isSuccess);
        })
        .catch(() => {
          setValidImage(false);
        });
    }
  });
  return (
    <>
      {!isValidImage ? (
        <TextField
          placeholder="Ссылка на изображение продукта"
          value={value}
          onChange={onChange}
          fullWidth
          inputProps={{
            'data-idx': idx,
          }}
        />
      ) : (
        <Card>
          <CardHeader
            action={
              <IconButton onClick={onDelete} data-idx={idx}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardMedia component="img" image={value} alt="Изображение продукта" />
          <CardActions>
            <FormControlLabel
              label="Обложка этого продукта"
              control={
                <Checkbox checked={isMainImage} onChange={onChangeMainImage} />
              }
            />
          </CardActions>
        </Card>
      )}
    </>
  );
}
