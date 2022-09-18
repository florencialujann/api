import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ResetPassword } from '../../apiServices/users';
import { useParams } from 'react-router-dom';
const theme = createTheme();

export default function ResetPass() {
	const { code } = useParams();
	console.log('Params', code);
	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const newpass = data.get('newpassword');
		const confirmpass = data.get('confirmpassword');
		// eslint-disable-next-line no-console

		if (newpass !== confirmpass) {
			alert('Nueva contrasenia y confirmar contrasenia deben ser iguales');
		} else {
			await ResetPassword(confirmpass, newpass, code);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<img src='/images/lockicon.png' alt='icon' />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Recuperar contraseña
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='newpassword'
									label='Nueva contraseña'
									name='newpassword'
									autoComplete='newpassword'
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2} style={{ marginTop: '10px' }}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='confirmpassword'
									label='Confirmar contraseña'
									name='confirmpassword'
									autoComplete='Confirmar contraseña'
								/>
							</Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
							//   href='/'
						>
							Enviar Mail de confirmación
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
