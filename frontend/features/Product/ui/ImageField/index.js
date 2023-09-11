import { useEffect } from 'react';

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
  isValidImage,
  isMainImage,
  onChangeMainImage,
  idx,
}) {
  const debouncedValue = useDebounce(value, 700);

  useEffect(() => {
    if (debouncedValue) {
      checkImage(debouncedValue)
        .then((res) => {
          const event = {
            target: {
              name: 'isValidImage',
              value: res.isSuccess,
            },
            currentTarget: { dataset: { idx } },
          };
          onChange(event);
        })
        .catch(() => {
          const event = {
            target: {
              name: 'isValidImage',
              value: false,
            },
            currentTarget: { dataset: { idx } },
          };
          onChange(event);
        });
    }
  }, [debouncedValue]);
  return (
    <>
      {!isValidImage ? (
        <TextField
          placeholder="Ссылка на изображение продукта"
          value={value}
          onChange={onChange}
          fullWidth
          name="url"
          type="url"
          pattern="https?://.+"
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
                <Checkbox
                  checked={isMainImage}
                  onChange={onChangeMainImage}
                  inputProps={{
                    'data-idx': idx,
                  }}
                />
              }
            />
          </CardActions>
        </Card>
      )}
    </>
  );
}
