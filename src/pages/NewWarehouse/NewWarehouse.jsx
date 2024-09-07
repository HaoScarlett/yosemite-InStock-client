import React from 'react';
import SectionHeader from '../../components/LowLevelComponents/SectionHeader/SectionHeader';
import WarehouseForm from '../../components/WarehouseForm/WarehouseForm';
import './NewWarehouse.scss';

function NewWarehouse() {

    const onSubmit = ()=>{
        alert("Form has been submitted");
    }

	return (
		<main>
			<div className='new-warehouse__header'>
				<SectionHeader
					text='Add New Warehouse'
					url='/'
				/>
			</div>
            <WarehouseForm getClassName="warehouse-edit" onSubmitFunction={onSubmit}/>
		</main>
	);
}

export default NewWarehouse;
