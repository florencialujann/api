import React from 'react';
import { Button } from './Button';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<div className='footer-container'>
			<section className='footer-subscription'>
				<p className='footer-subscription-heading'>
					Subscribite a nuestro newsletter para recibir noticias relacionadas a
					la salud infantil
				</p>
				<p className='footer-subscription-text'>
					Te puedes desubscribir en cualquier momento.
				</p>
				<div className='input-areas'>
					<form>
						<input
							type='email'
							name='email'
							placeholder='Tu email'
							className='footer-input'
						/>
						<Button buttonStyle='btn--outline'>Subscribete</Button>
					</form>
				</div>
			</section>
			<div className='footer-links'>
				<div className='footer-link-wrapper'>
					<div className='footer-link-items'>
						<h2>Sobre nosotros</h2>
						<Link to='/'>Testimonios</Link>
						<Link to='/'>Terminos y condiciones</Link>
					</div>
					<div className='footer-link-items'>
						<h2>Contactanos</h2>
						<Link to='/'>Contacto</Link>
						<Link to='/'>Soporte</Link>
						<Link to='/'>Partners</Link>
					</div>
				</div>
				<div className='footer-link-wrapper'>
					<div className='footer-link-items'>
						<h2>Redes sociales</h2>
						<Link to='/'>Instagram</Link>
						<Link to='/'>Facebook</Link>
						<Link to='/'>Twitter</Link>
						<Link to='/'>Linkedin</Link>
					</div>
				</div>
			</div>
			<section className='social-media'>
				<div className='social-media-wrap'>
					<div className='footer-logo'>
						<Link to='/' className='social-logo'>
							CRESA <i className='fas fa-baby'></i>
						</Link>
					</div>
					<small className='website-rights'>CRESA © 2021</small>
					<div className='social-icons'>
						<Link
							className='social-icon-link facebook'
							to='/'
							target='_blank'
							aria-label='Facebook'
						>
							<i className='fab fa-facebook-f'></i>
						</Link>
						<Link
							className='social-icon-link instagram'
							to='/'
							target='_blank'
							aria-label='Instagram'
						>
							<i className='fab fa-instagram'></i>
						</Link>
						<Link
							className='social-icon-link twitter'
							to='/'
							target='_blank'
							aria-label='Twitter'
						>
							<i className='fab fa-twitter'></i>
						</Link>
						<Link
							className='social-icon-link linkedin'
							to='/'
							target='_blank'
							aria-label='Twitter'
						>
							<i className='fab fa-linkedin'></i>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Footer;
