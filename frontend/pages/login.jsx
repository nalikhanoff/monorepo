import { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Login() {
  const router = useRouter();

  const [loginState, setLoginState] = useState({
    login: '',
    password: '',
  });

  const { current: handleTextFieldChange } = useRef((e) => {
    const { name, value } = e.target;

    setLoginState((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  });

  const handleLoginClick = useCallback(async () => {
    try {
      const { data } = await axios.post('/api/login', loginState);
      setCookie('token', data.token);
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  }, [loginState]);
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={4}>
        <Paper elevation={1} sx={{ mt: 10, py: 2 }}>
          <Typography align="center" variant="h5">
            Вход
          </Typography>
          <Box sx={{ mt: 7, p: 2 }}>
            <TextField
              label="Логин"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              name="login"
              value={loginState.login}
              onChange={handleTextFieldChange}
            />
            <TextField
              label="Пароль"
              type="password"
              variant="outlined"
              fullWidth
              name="password"
              value={loginState.password}
              onChange={handleTextFieldChange}
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 6 }}
              onClick={handleLoginClick}
            >
              Войти
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
