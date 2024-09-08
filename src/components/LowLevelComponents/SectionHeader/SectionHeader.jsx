import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SectionHeader.scss';
import arrow from '../../../assets/Icons/arrow_back-24px.svg';

export default function SectionHeader({ text, url }) {
	const navigate = useNavigate();

	const handleBack = (e) => {
		e.preventDefault();
		if (url) {
			navigate(url)
		} else {
			navigate(-1)
		}
	}

	return (
		<div className='header__left'>
			<Link
				href="./"
				className='header__back'
				onClick={handleBack}
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
