'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import {useRouter} from 'next/navigation'
import {Grid, Link} from '@/node_modules/@mui/material/index';

export default function Login() {
  const host = process.env.NEXT_PUBLIC_WEBSOCKET_HOST || 'localhost';
  const port = process.env.NEXT_PUBLIC_WEBSOCKET_PORT || 51180;

  const [loginFailed, setLoginFailed] = React.useState(false)
  const [loggedin, setLoggedin] = React.useState(false)
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const body_data = {"user_id": data.get('username'), "password": data.get('password')}

    fetch(`http://${host}:${port}/api/v1/auth/login`, {
      mode: 'cors',
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body_data),
    }).then((response)=> {
      if (response.ok) {
        setLoggedin(true)
      } else {
        setLoginFailed(true)
      }
    });

  };

  React.useEffect(() => {
    if (loggedin) {
      router.push('/chat')
    }
  }, [loggedin])

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/*
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        */}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/register" variant="body2">
              Sign up
            </Link>
          </Grid>
        </Grid>
        {
          loginFailed &&
            <Alert severity="error">Login failed!</Alert>
        }
      </Box>
    </Container>
  );
}
