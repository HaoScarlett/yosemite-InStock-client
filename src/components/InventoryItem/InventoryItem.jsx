import React, { useState, useEffect } from 'react';
import './InventoryItem.scss';
import InOutStock from '../LowLevelComponents/InOutStock/InOutStock.jsx';
import SectionHeader from '../LowLevelComponents/SectionHeader/SectionHeader.jsx';
import EditButton from '../LowLevelComponents/Editbutton/Editbutton.jsx';
import { fetchInventoryItem } from '../../utils/api.js';

export default function InventoryItem({ itemId }) {
	const [inventoryItem, setInventoryItem] = useState({});
	if (!itemId) {
		itemId = 1;
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchInventoryItem(itemId);
				setInventoryItem(response.data[0]);
				console.log(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const {
		warehouse_name,
		item_name,
		description,
		category,
		status,
		quantity,
	} = inventoryItem;
	const inStock = status === 'In Stock' ? true : false;

	return (
		<section className='inventory'>
			<div className='inventory__header'>
				<SectionHeader text={item_name} />
				<EditButton />
			</div>
			<div className='inventory__body'>
				<div>
					<label>ITEM DESCRIPTION:</label>
					<p className='p2-body-medium'>{description}</p>
					<label>CATEGORY:</label>
					<p className='p2-body-medium'>{category}</p>
				</div>
				<div className='inventory__body-right'>
					<div className='inventory-stats'>
						<div className='inventory-stats__status-quant'>
							<div>
								<label>STATUS:</label>
								<InOutStock inStock={inStock} />
							</div>
							<div>
								<label>QUANTITY:</label>
								<p className='p2-body-medium'>{quantity}</p>
							</div>
						</div>
						<label>WAREHOUSE:</label>
						<p className='p2-body-medium'>{warehouse_name}</p>
					</div>
				</div>
			</div>
		</section>
	);
}
