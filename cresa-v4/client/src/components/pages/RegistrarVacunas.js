import './Calendar.css'
import React, { useState, useEffect, useCallback } from 'react'

import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'

import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { getVaccine, registerVaccine } from '../../apiServices/users'
function RegistrarVacunas () {
  const callVaccinesAPI = useCallback(async () => {
    const res = await getVaccine()
    console.log('res', res)
  }, [])
  useEffect(() => {
    callVaccinesAPI()
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log('data', data)
    await registerVaccine({
      name: data.get('vacuna'),
      doses: parseInt(data.get('dosis')),
      dateofApplication: data.get('fecha'),
      placeofApplication: data.get('lugar')
    })
  }
  return (
    <div className='image-container'>
      <img src='/images/calendario.jpg' />
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
          <Typography component='h1' variant='h5'>
            Cargar vacuna
          </Typography>
          <Box
            component='form'
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='vacuna'
              label='Nombre de la vacuna'
              name='vacuna'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='dosis'
              label='Número de dosis'
              type='dosis'
              id='dosis'
              autoComplete='dosis'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='fecha'
              label='Fecha de aplicacíon'
              type='date'
              id='fecha'
              autoComplete='fecha'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='lugar'
              label='Lugar de aplicación'
              type='lugar'
              id='lugar'
              autoComplete='lugar'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              //   href='/profile'
            >
              Registrar vacuna
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default RegistrarVacunas
