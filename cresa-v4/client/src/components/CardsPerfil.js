import React from 'react';
import Carditem from './Carditem';
import './Cards.css';

function Cards() {
	return (
		<div className='cards'>
			<h1>Tablas disponibles</h1>
			<div className='cards__container'>
				<div className='cards__wrapper'>
					<ul className='cards__items'>
						<Carditem
							src='../images/altura.jpg'
							text='Percentil de altura para la edad'
							path='/PercentilAltura'
						/>
					</ul>
					<ul className='cards__items'>
						<Carditem
							src='../images/peso.jpg'
							text='Percentil de peso para la edad'
							path='/PercentilPeso'
						/>
					</ul>
				</div>
			</div>
		</div>
	);
	
}

export default Cards;
