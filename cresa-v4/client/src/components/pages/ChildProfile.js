import React, { useState } from 'react';
import Carditem from '../Carditem';
import '../Cards.css';

function ChildProfile() {
	return (
		<div className='cards'>
			<div className='cards__container'>
				<div className='cards__wrapper'>
					<ul className='cards__items'>
						<Carditem
							src='/images/pediatra.jpeg'
							text='Registro de controles pediatricos'
							label='Controles pediatricos'
							path='/registro-control-pediatrico'
						/>
						<Carditem
							src='/images/vacunas-bebes.jpg'
							text='Registrar vacunas'
							label='Vacunas'
							path='/registrar-vacunas'
						/>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default ChildProfile;
