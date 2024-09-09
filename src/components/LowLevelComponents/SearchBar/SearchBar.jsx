import React from 'react';
import './SearchBar.scss';
import searchIcon from '../../../assets/Icons/search-24px.svg';

export default function SearchBar({ className }) {
	const classNames = `search-bar ${className}`;
	return (
		<div className={classNames}>
			<img
				className='search-bar__icon'
				src={searchIcon}
				alt='search'
			/>
			<input
				className='search-bar__field p2-body-medium'
				type='text'
				name='search'
				placeholder='Search...'
			/>
		</div>
	);
}
