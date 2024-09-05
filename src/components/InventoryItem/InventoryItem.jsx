import React from 'react';
import './InventoryItem.scss';
import InOutStock from '../InOutStock/InOutStock.jsx';
import Header from '../LowLevelComponents/Header/Header.jsx'

export default function InventoryItem() {

    const name = "Television";
    const itemDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    const itemCategory = 'Electronics';
    const itemQuantity = '500';
    const itemWarehouse = 'Manhatten';


	return (
		<section className='inventory'>
			<div className='inventory-header'>
                <div className='inventory-header__left'>
                    <Header text={name}/>
                </div>
                <p>button</p>
            </div>
			<div className='inventory-info'>
                <label>ITEM DESCRIPTION:</label>
                <p>{itemDescription}</p>
                <label>CATEGORY:</label>
                <p>{itemCategory}</p>
            </div>
			<div className='inventory-stats'>
                <div className='inventory-stats__status-quant'>
                    <div>
                        <label>STATUS:</label>
                        <InOutStock inStock={true}/>
                    </div>
                    <div>
                        <label>QUANTITY:</label>
                        <p>{itemQuantity}</p>
                    </div>
                </div>
                <label>WAREHOUSE:</label>
                <p>{itemWarehouse}</p>
            </div>
		</section>
	);
}
