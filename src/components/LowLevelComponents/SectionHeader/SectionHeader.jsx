import React from 'react';
import { Link } from 'react-router-dom';
import './SectionHeader.scss';
import arrow from '../../../assets/Icons/arrow_back-24px.svg';

export default function SectionHeader({ text, url }) {
	if (!url) {
		url = '/';
	}
	return (
		<div className='header__left'>
			<Link
				to={url}
				className='header__back'
			>
				<img
					src={arrow}
					alt='Blue arrow pointing left'
				/>
			</Link>
			<h1 className='h1-page-header'>{text}</h1>
		</div>
	);
}
