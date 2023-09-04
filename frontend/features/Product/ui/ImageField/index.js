import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';

export default function ImageField({
  onChange,
  onDelete,
  isValidImage,
  value,
  isMainImage,
  onChangeMainImage,
}) {
  return (
    <>
      {!value && !isValidImage && (
        <TextField
          placeholder="Ссылка на изображение продукта"
          value={value}
          onChange={onChange}
          fullWidth
        />
      )}
      {isValidImage && (
        <Card>
          <CardHeader
            action={
              <IconButton onClick={onDelete}>
                <CloseIcon />
              </IconButton>
            }
          />
          <CardMedia
            component="img"
            width="194"
            image={value}
            alt="Изображение продукта"
          />
          <CardActions>
            <Checkbox checked={isMainImage} onChange={onChangeMainImage} />
          </CardActions>
        </Card>
      )}
    </>
  );
}
