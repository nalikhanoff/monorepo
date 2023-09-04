import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Appbar() {
  const { data: session } = useSession();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            sx={{ flexGrow: 1, textDecoration: 'none' }}
            href="/"
            color="white"
          >
            ErKul Company
          </Typography>
          {!session?.jwt ? (
            <Button color="inherit" component={Link} href="/login">
              Вход
            </Button>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                href="/admin/create"
                sx={{ mr: 1 }}
              >
                Создать
              </Button>
              <Button color="inherit" variant="outlined" onClick={signOut}>
                Выйти
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
