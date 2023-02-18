import React from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useAuth } from '../firebase/AuthContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const registerUser = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    await signUp(data.get('email'), data.get('password'), data.get('name'))
    navigate('/login')
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, backgroundColor: theme.palette.secondary.main }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component={'h1'} variant="h5">
          Sign Up
        </Typography>
        <Box component={'form'} sx={{ mt: 3 }} onSubmit={registerUser}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                fullWidth
                required
                name="name"
                autoFocus
                label="Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                fullWidth
                required
                name="email"
                label="Email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="password"
                type="password"
                fullWidth
                required
                name="password"
                label="Password"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
            Register
          </Button>
          <Grid container justifyContent={'flex-end'}>
            <Grid item>
              <Link variant="body2" href="/login">
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Register
