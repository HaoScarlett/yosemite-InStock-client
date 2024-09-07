import React from 'react';
import SectionHeader from '../../components/LowLevelComponents/SectionHeader/SectionHeader';
import WarehouseForm from '../../components/WarehouseForm/WarehouseForm';
import './NewWarehouse.scss';

function NewWarehouse() {

    const onSubmit = (event)=>{
        console.log("Event", event.target);
        console.log(event.target.warehouse__name.value);
        
    }

	return (
		<main>
			<div className='new-warehouse__header'>
				<SectionHeader
					text='Add New Warehouse'
					url='/'
				/>
			</div>
            <WarehouseForm getClassName="warehouse-add" onSubmitFunction={onSubmit}/>
		</main>
	);
}

export default NewWarehouse;
