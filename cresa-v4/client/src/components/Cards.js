import React from 'react';
import Carditem from './Carditem';
import './Cards.css';

function Cards() {
	return (
		<div className='cards'>
			<div className='cards__container'>
				<h1>¿Por que es necesario cuidar de nuestros niños?</h1>
				<h2>
					Las visitas al pediatra no solo deben hacerse en caso de enfermedad,
					sino que también son importantes para los niños sanos. Cada control
					pediátrico incluye un examen físico completo. En este examen, el
					médico verifica el crecimiento y desarrollo del bebé o del niño con el
					fin de encontrar o prevenir problemas.
				</h2>
				<div className='cards__wrapper'>
					<ul className='cards__items'>
						<Carditem
							src='../images/img-9.jpg'
							text='Consulta el calendario de vacunacion'
							label='Calendario de Vacunacion'
							path='/calendar'
						/>
						<Carditem
							src='../images/img-3.jpg'
							text='Información sobre controles médicos'
							label='Info general'
							path='/InfoGral'
						/>
						<Carditem
							src='../images/img-2.jpg'
							text='Percentiles y parámetros generales de control'
							label='Percentiles y parámetros'
							path='/Percentil'
						/>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Cards;
