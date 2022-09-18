import React, { useEffect, useState } from 'react'
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
import { update, profile } from '../../apiServices/users'
import { useHistory } from 'react-router-dom'
const theme = createTheme()

export default function Profile () {
  const history = useHistory()
  const [profileData, setProfiledata] = useState({})
  const getProfile = React.useCallback(async () => {
    const res = await profile()
    if (res) {
      setProfiledata(res)
      console.log({ res })
    }
  }, [profileData])
  useEffect(() => {
    if (!localStorage['authToken']) {
      history.push('/sign-in')
      alert('Sign-In first please')
    } else {
      getProfile()
    }
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    data.append('email', email)
    const res = await update(data)
    // eslint-disable-next-line no-console
  }

  const [name, setName] = useState(profileData && profileData?.name)
  const [surname, setSurname] = useState(profileData && profileData.surname)
  const [phone, setPhone] = useState(profileData && profileData.phone)
  const [dni, setDni] = useState(profileData && profileData.dni)
  const [email, setEmail] = useState(profileData && profileData.email)

  useEffect(() => {
    setName(profileData && profileData?.name)
    setSurname(profileData && profileData?.surname)
    setPhone(profileData && profileData?.phone)
    setDni(profileData && profileData?.dni)
    setEmail(profileData && profileData?.email)
  }, [profileData])
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
            Provile
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='fname'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='Nombre'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Apellido'
                  value={surname}
                  onChange={e => setSurname(e.target.value)}
                  name='lastName'
                  autoComplete='lname'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='dni'
                  label='DNI'
                  name='dni'
                  value={dni}
                  onChange={e => setDni(e.target.value)}
                  autoComplete='dni'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='telefono'
                  label='Telefono'
                  name='telefono'
                  autoComplete='telefono'
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Dirección de email'
                  name='email'
                  disabled={true}
                  autoComplete='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value='allowExtraEmails' color='primary' />
                  }
                  label='Quiero recibir contenido promocional por email.'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              UPDATE
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
