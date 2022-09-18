import React from 'react';
import '../App.css';
import { Button } from './Button';
import './FamilySection.css';

function FamilySection() {
	return (
		<div className='family-container'>
			<video src='/videos/video-2.mp4' autoPlay loop muted />
			<h1>CRECIENDO SANOS</h1>
			<p>Cuidado familiar</p>
		</div>
	);
}

export default FamilySection;
