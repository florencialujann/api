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
import { registerPediatric } from '../../apiServices/users'
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

export default function RegistroControlPediatrico () {
  const handleSubmit = async event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    console.log({
      fecha: data.get('fecha'),
      peso: data.get('peso'),
      altura: data.get('altura'),
      diametrocabeza: data.get('diametrocabeza'),
      observaciones: data.get('observaciones'),
      medicamentos_recetados: data.get('medicamentos_recetados'),
      estudios_medicos_a_realizar: data.get('estudios_medicos_a_realizar'),
      resultados: data.get('resultados')
    })
    const res = await registerPediatric({
      dateofrecord: data.get('fecha'),
      weight: data.get('peso'),
      height: data.get('altura'),
      headdiameter: data.get('diametrocabeza'),
      observations: data.get('observaciones'),
      prescriptiondrug: data.get('medicamentos_recetados'),
      medicalstudies: data.get('estudios_medicos_a_realizar'),
      result: data.get('resultados')
    })
    console.log(res)
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
            Registro de control pediatrico
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
              id='fecha'
              label='Fecha'
              name='fecha'
              type='date'
              autoComplete='fecha'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='peso'
              label='Peso'
              id='peso'
              autoComplete='peso'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='altura'
              label='Altura'
              id='altura'
              autoComplete='altura'
            />
            <TextField
              margin='normal'
              fullWidth
              name='diametrocabeza'
              label='Diametro de la cabeza (1er año)'
              id='diametrocabeza'
              autoComplete='diametrocabeza'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='observaciones'
              label='Observaciones'
              id='observaciones'
              autoComplete='observaciones'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='medicamentos_recetados'
              label='Medicamentos recetados'
              id='medicamentos_recetados'
              autoComplete='medicamentos_recetados'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='estudios_medicos_a_realizar'
              label='Estudios medicos a realizar'
              id='estudios_medicos_a_realizar'
              autoComplete='estudios_medicos_a_realizar'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='resultados'
              label='Resultados'
              id='resultados'
              autoComplete='resultados'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              //   href='/profile'
            >
              Registrar control pediatrico
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
