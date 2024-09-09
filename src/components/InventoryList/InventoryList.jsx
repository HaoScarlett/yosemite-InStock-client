import React, { useEffect, useState } from 'react';
import { fetchInventoryList, fetchSpecificInventory } from '../../utils/api.js';
import ItemRow from '../ItemRow/ItemRow.jsx';
import SearchBar from '../LowLevelComponents/SearchBar/SearchBar.jsx';
import CTAButton from '../LowLevelComponents/CTAButton/CTAButton.jsx';
import './InventoryList.scss';
import { useNavigate, Link } from 'react-router-dom';

function InventoryList({
	id,
	className,
	inventoryList,
	onItemClick,
	warehouseId = null,
	warehouseName,
}) {
	const [inventoryData, setInventoryData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [deleteItem, setDeletedItem] = useState(0);
	const navigate = useNavigate(); //

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchInventoryList();
				setInventoryData(response.data);
				setIsLoading(false);
			} catch (error) {
				setError('Failed to load inventory data');
				setIsLoading(false);
			}
		};
		const fetchSpecificData = async (warehouseId) => {
			try {
				const response = await fetchSpecificInventory(warehouseId);
				setInventoryData(response.data);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
			}
		};

		if (!warehouseId) {
			fetchData();
		} else {
			fetchSpecificData(warehouseId);
		}
	}, [id, deleteItem]);

	const handleAddNewItem = () => {
		navigate('/inventory/add');
	};

	const handleDelete = () => {
		setDeletedItem((prevCount) => prevCount + 1);
	};

	if (isLoading) {
		return <div>Loading inventory data...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!Array.isArray(inventoryData) || inventoryData.length === 0) {
		return <div>No inventory items available.</div>;
	}

	console.log('InventoryList rendered with:', inventoryList);

	const showWarehouse = className !== 'hidden';

	const handleItemClick = (itemId) => {
		console.log('Item clicked in InventoryList:', itemId);
		onItemClick(itemId);
	};

	const warehouse_column = ()=>{
		if(!warehouseId){
			return <th>WAREHOUSE</th>;
		}
	}

	return (
		<div
			className={`inventory-list ${
				!showWarehouse ? 'no-shadow' : ''
			}`}
		>
			{showWarehouse && (
				<>
					<div className='inventory-list__mobile-wrapper'>
						<h1 className='inventory-list__title'>Inventory</h1>
						<SearchBar className='inventory-list__search' />
						<Link to={'/inventory/add'}>
							<CTAButton
								text='+ Add New Item'
								onClick={handleAddNewItem}
								variant='primary'
							/>
						</Link>
					</div>
				</>
			)}

			<table className='inventory-table'>
				<thead>
					<tr className='inventory-header h4-table-header'>
						<th>INVENTORY ITEM</th>
						<th>CATEGORY</th>
						<th>STATUS</th>
						<th>QTY</th>
						{warehouse_column()}
						<th>ACTIONS</th>
					</tr>
				</thead>
				<tbody>
					{inventoryData.map((inventory) => (
						<ItemRow
							key={inventory.id}
							item={inventory}
							showWarehouse={showWarehouse}
							onItemClick={handleItemClick}
							handleDelete={handleDelete}
							warehouseName={warehouseName}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default React.memo(InventoryList);
