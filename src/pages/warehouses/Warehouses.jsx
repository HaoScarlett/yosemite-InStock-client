import React from 'react';
import WarehouseList from '../../components/WarehouseList/WarehouseList';
import { useNavigate } from 'react-router-dom';
function Warehouses() {
	const navigate = useNavigate();

	return (
		<div>
			<WarehouseList />
		</div>
	);
}

export default Warehouses;
