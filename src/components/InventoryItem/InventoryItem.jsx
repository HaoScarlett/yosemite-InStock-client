import React from 'react';
import { Link } from 'react-router-dom';
import './InventoryItem.scss';
import arrow from '../../assets/Icons/arrow_back-24px.svg';
import edit from '../../assets/Icons/edit-white-24px.svg';

export default function InventoryItem() {

    const name = "Television";



	return (
		<section className='inventory'>
			<div className='inventory-header'>
                <Link to='/' className='inventory-header__back'><img src={arrow} alt="Blue arrow pointing left" /></Link>
                <h1 className='inventory-header__title'>{name}</h1>
                <Link to='/' className='inventory-header__edit'><img src={edit} alt="White pencil on blue circle background with the eraser at the top and the pencil tip at the bottom. Tilted with the eraser 45 degrees to the right." /></Link>
            </div>
			<div></div>
			<div></div>
		</section>
	);
}
