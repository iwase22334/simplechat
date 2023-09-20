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
import {Grid, Link} from '@mui/material/index';

const MinPasswordLength = 6;
const MaxPasswordLength = 32;
const MinUserNameLength = 3;
const MaxUserNameLength = 16;

export default function Login() {
  const host = process.env.WEBSOCKET_HOST || 'localhost';
  const port = process.env.WEBSOCKET_PORT || 51180;

  const [registerFailed, setRegisterFailed] = React.useState(false)
  const [passwordMismatch, setPasswordMismatch] = React.useState(false)
  const [invalidUserNameLength, setInvalidUserNameLength] = React.useState(false)
  const [invalidPasswordLength, setInvalidPasswordLength] = React.useState(false)

  const [loggedin, setLoggedin] = React.useState(false)
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username')
    const password = data.get('password')
    const confirm_password = data.get('confirm-password')

    if (password != confirm_password) {
      setPasswordMismatch(true)
      return
    } else {
      setPasswordMismatch(false)
    }

    if (username!.length > MaxUserNameLength) {
      setInvalidUserNameLength(true)
      return
    } else {
      setInvalidUserNameLength(false)
    }

    if (username!.length < MinUserNameLength) {
      setInvalidUserNameLength(true)
      return
    } else {
      setInvalidUserNameLength(false)
    }

    if (password!.length > MaxPasswordLength) {
      setInvalidPasswordLength(true)
      return
    } else {
      setInvalidPasswordLength(false)
    }

    if (password!.length < MinPasswordLength) {
      setInvalidPasswordLength(true)
      return
    } else {
      setInvalidPasswordLength(false)
    }

    const body_data = {"user_id": username, "password": password}
    fetch(`http://${host}:${port}/api/v1/auth/register`, {
      mode: 'cors',
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body_data),
    }).then((response)=> {
      if (response.ok) {
        setLoggedin(true)
      } else {
        setRegisterFailed(true)
      }
    });
  };

  React.useEffect(() => {
    if (loggedin) {
      router.push('/')
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
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            inputProps={{ minLength: MinUserNameLength, maxLength: MaxUserNameLength }}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            inputProps={{ minLength: MinPasswordLength, maxLength: MaxPasswordLength }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirm-password"
            label="Confirm Password"
            name="confirm-password"
            type="password"
            inputProps={{ minLength: MinPasswordLength, maxLength: MaxPasswordLength }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/" variant="body2">
              Sign in
            </Link>
          </Grid>
        </Grid>
        {
          registerFailed &&
            <Alert severity="error">登録失敗</Alert>
        }
        {
          passwordMismatch &&
            <Alert severity="error">パスワードが一致しません</Alert>
        }
        {
          invalidUserNameLength &&
            <Alert severity="error">usernameは{MinUserNameLength}~{MaxUserNameLength}文字で入力してください</Alert>
        }
        {
          invalidPasswordLength &&
            <Alert severity="error">passwordは{MinPasswordLength}~{MaxPasswordLength}文字で入力してください</Alert>
        }
      </Box>
    </Container>
  );
}
