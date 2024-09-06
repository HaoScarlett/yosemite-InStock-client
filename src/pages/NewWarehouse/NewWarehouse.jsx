import React from 'react';
import SectionHeader from '../../components/LowLevelComponents/SectionHeader/SectionHeader';
import WarehouseForm from '../../components/WarehouseForm/WarehouseForm';
import './NewWarehouse.scss';

function NewWarehouse() {
	return (
		<main>
			<div className='new-warehouse__header'>
				<SectionHeader
					text='Add New Warehouse'
					url='/'
				/>
			</div>
            <WarehouseForm />
		</main>
	);
}

export default NewWarehouse;
