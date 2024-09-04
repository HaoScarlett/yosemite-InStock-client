import React from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/Logo/InStock-Logo.svg';

export default function Header() {
	return (
		<nav className='header'>
			<Link to='/'>
				<img
					className='header__logo'
					src={logo}
					alt='Two blue arrows in the shape of a box with one pointing up and one pointing down.'
				/>
			</Link>
			<div className='header__nav-links'>
				<NavLink to='/'>Warehouses</NavLink>
				<NavLink to='/inventory'>Inventory</NavLink>
			</div>
		</nav>
	);
}
