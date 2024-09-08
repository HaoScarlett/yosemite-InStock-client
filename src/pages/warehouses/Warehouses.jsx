import React from 'react';
import WarehouseList from '../../components/WarehouseList/WarehouseList';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
function Warehouses() {
	const navigate = useNavigate();


	console.log('Warehouse component rendered');


	// Handle item click
	const handleItemClick = (itemId) => {
		console.log('Item clicked:', itemId);
		navigate(`/inventory/${itemId}`);
	};

	return (
		<div>
			<WarehouseList />
		</div>
	);
}

export default Warehouses;
