import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { login } from '../../apiServices/users'
/* function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}
		>
			{'Copyright © '}
			<Link color='inherit' href='https://material-ui.com/'>
				CRESA
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
} */

const theme = createTheme()

export default function SignIn () {
  const handleSubmit = async event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // const res = signIn(data.get('email'), data.get('password'))
    const res = await login(data.get('email'), data.get('password'))
    if (res) {
      window.location.href = '/profile'
    }
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password')
    // })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <img src='/images/lockicon.png' alt='icon' />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Iniciar Sesion
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Dirección de Email'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Contraseña'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Recordarme'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              // href='/'
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='/Forgetpassword' variant='body2'>
                  Olvidé mi contraseña
                </Link>
              </Grid>
              <Grid item>
                <Link href='/sign-up' variant='body2'>
                  {'¿No tienes una cuenta? Registrate'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
