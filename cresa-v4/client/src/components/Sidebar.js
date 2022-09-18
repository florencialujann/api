import React from 'react';
import { Link } from 'react-router-dom';
const Sidebar = () => {
	return (
		<div className='db-navbar'>
			<ul className=''>
				<li>
					<Link to='/profile'>Perfil</Link>
				</li>
				<li>
					<Link to='/childrens'>Hijos</Link>
				</li>
				<li>
					<Link to='/vaccines'>Vacunas</Link>
				</li>
				<li>
					<Link to='/pediatric'>Controles Pediatricos</Link>
				</li>
				<li>
					<Link to='/percentile'>Percentiles</Link>
				</li>
				<li>
					<Link
						onClick={() => {
							localStorage.clear();
							setTimeout(() => {
								window.location.href = '/';
							}, 100);
						}}
					>
						Logout
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
