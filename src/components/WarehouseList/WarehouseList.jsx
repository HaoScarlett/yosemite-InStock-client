import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchWarehousesList } from '../../utils/api.js';
import WarehouseItemRow from '../WarehouseItemRow/WarehouseItemRow.jsx';
import SearchBar from '../LowLevelComponents/SearchBar/SearchBar.jsx';
import './WarehouseList.scss';
import sortIcon from '../../assets/Icons/sort-24px.svg';

function WarehouseList() {
	const [warehouseList, setWarehouseList] = useState([]);
	const [deletedItem, setDeletedItem] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchWarehousesList();
				setWarehouseList(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [deletedItem]);

	const handleWarehouseClick = (warehouseId) => {
		navigate(`/warehouses/${warehouseId}`);
	};

	const handleDeletedItem = () => {
		setDeletedItem((prevCount) => prevCount + 1);
	};

	return (
		<div className='warehouse-list'>
			<div className='warehouse-list__header'>
				<h1 className='warehouse-list__title h1-page-header'>
					Warehouses
				</h1>
				<div className='warehouse-list__interactive'>
					<SearchBar className='warehouse-list__search' />
					<Link
						to='/warehouses/new'
						className='warehouse-list__add-link'
					>
						+ Add New Warehouse
					</Link>
				</div>
			</div>
			<table className='warehouse-table'>
				<thead>
					<tr className='warehouse-header h4-table-header'>
						<th>
							<p className='warehouse-header__column-header'>
								WAREHOUSE
								<img
									src={sortIcon}
									alt='Top of up arrow and top of bottom arrow in a vertical column.'
								/>
							</p>
						</th>
						<th>
							<p className='warehouse-header__column-header'>
								ADDRESS
								<img
									src={sortIcon}
									alt='Top of up arrow and top of bottom arrow in a vertical column.'
								/>
							</p>
						</th>
						<th>
							<p className='warehouse-header__column-header'>
								CONTACT NAME
								<img
									src={sortIcon}
									alt='Top of up arrow and top of bottom arrow in a vertical column.'
								/>
							</p>
						</th>
						<th>
							<p className='warehouse-header__column-header'>
								CONTACT INFORMATION
								<img
									src={sortIcon}
									alt='Top of up arrow and top of bottom arrow in a vertical column.'
								/>
							</p>
						</th>
						<th>ACTIONS</th>
					</tr>
				</thead>
				<tbody className='warehouse-body'>
					{warehouseList.map((warehouse) => (
						<WarehouseItemRow
							key={warehouse.id}
							warehouse={warehouse}
							handleWarehouseClick={handleWarehouseClick}
							handleDeletedItem={handleDeletedItem}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default WarehouseList;
