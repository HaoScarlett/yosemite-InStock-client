import React from 'react';
import SectionHeader from '../../components/LowLevelComponents/SectionHeader/SectionHeader';
import WarehouseForm from '../../components/WarehouseForm/WarehouseForm';
import './NewWarehouse.scss';
import { postWarehouse } from '../../utils/api';
import { updateWarehouse } from '../../utils/api';

function EditWarehouse() {

    const onSubmit = async (formData) => {
        try {
            if (getClassName === 'warehouse-edit') {
                await updateWarehouse(formData); 
            } else {
                await postWarehouse(formData); 
            }
            alert("Warehouse saved successfully!");
        } catch (error) {
            console.error("Error saving warehouse:", error);
            alert("Failed to save warehouse.");
        }
    };
	

	return (
		<main>
			<div className='new-warehouse__header'>
				<SectionHeader
					text='Edit New Warehouse'
					url='/'
				/>
			</div>
			<WarehouseForm
				getClassName='warehouse-edit'
				onSubmitFunction={onSubmit}
			/>
		</main>
	);
}

export default EditWarehouse;
