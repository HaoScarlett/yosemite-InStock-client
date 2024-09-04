import React from 'react';
import { Link } from 'react-router-dom';
import './InventoryItem.scss';
import arrow from '../../assets/Icons/arrow_back-24px.svg';
import edit from '../../assets/Icons/edit-white-24px.svg';
import InOutStock from '../InOutStock/InOutStock.jsx';

export default function InventoryItem() {

    const name = "Television";
    const itemDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const itemCategory = 'Electronics';
    const itemQuantity = '500';
    const itemWarehouse = 'Manhatten';


	return (
		<section className='inventory'>
			<div className='inventory-header'>
                <div>
                    <Link to='/' className='inventory-header__back'><img src={arrow} alt="Blue arrow pointing left" /></Link>
                    <h1 className='inventory-header__title'>{name}</h1>
                </div>
                <Link to='/' className='inventory-header__edit'><img src={edit} alt="White pencil on blue circle background with the eraser at the top and the pencil tip at the bottom. Tilted with the eraser 45 degrees to the right." /></Link>
            </div>
			<div className='inventory-info'>
                <label>ITEM DESCRIPTION</label>
                <p>{itemDescription}</p>
                <label>CATEGORY</label>
                <p>{itemCategory}</p>
            </div>
			<div className='inventory-stats'>
                <div className='inventory-stats__status-quant'>
                    <div>
                        <label>STATUS</label>
                        <InOutStock inStock={true}/>
                    </div>
                    <div>
                        <label>QUANTITY</label>
                        <p>{itemQuantity}</p>
                    </div>
                </div>
                <label>WAREHOUSE</label>
                <p>{itemWarehouse}</p>
            </div>
		</section>
	);
}
