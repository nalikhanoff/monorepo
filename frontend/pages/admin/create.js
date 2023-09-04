import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function CreateProduct() {
  return (
    <Grid container sx={{ marginTop: 2 }}>
      <Grid item xs={5}>
        <TextField placeholder="Название" fullWidth />
        <TextField
          placeholder="Описание"
          fullWidth
          multiline
          sx={{ marginTop: 2 }}
          maxRows={Infinity}
          minRows={3}
        />
        <TextField
          placeholder="Цена"
          sx={{ marginTop: 2 }}
          fullWidth
          type="number"
        />
      </Grid>
    </Grid>
  );
}
