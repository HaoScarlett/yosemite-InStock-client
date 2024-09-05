import React from 'react';
import './InventoryItem.scss';
import InOutStock from '../InOutStock/InOutStock.jsx';
import SectionHeader from '../LowLevelComponents/SectionHeader/SectionHeader.jsx';

export default function InventoryItem() {
	const name = 'Television';
	const itemDescription =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
	const itemCategory = 'Electronics';
	const itemQuantity = '500';
	const itemWarehouse = 'Manhatten';

	return (
		<section className='inventory'>
			<div className='inventory-header'>
				<div className='inventory-header__left'>
					<SectionHeader text={name} />
				</div>
				<p>button</p>
			</div>
			<div className='inventory-body'>
				<div className='inventory-info'>
					<label>ITEM DESCRIPTION:</label>
					<p className='p2-body-medium'>{itemDescription}</p>
					<label>CATEGORY:</label>
					<p className='p2-body-medium'>{itemCategory}</p>
				</div>
				<div className='inventory-body__right'>
					<div className='inventory-stats'>
						<div className='inventory-stats__status-quant'>
							<div>
								<label>STATUS:</label>
								<InOutStock inStock={true} />
							</div>
							<div>
								<label>QUANTITY:</label>
								<p className='p2-body-medium'>{itemQuantity}</p>
							</div>
						</div>
						<label>WAREHOUSE:</label>
						<p className='p2-body-medium'>{itemWarehouse}</p>
					</div>
				</div>
			</div>
		</section>
	);
}