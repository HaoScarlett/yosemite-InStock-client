import React from 'react';
import { useState } from 'react';
import SectionHeader from '../../components/LowLevelComponents/SectionHeader/SectionHeader';
import WarehouseForm from '../../components/WarehouseForm/WarehouseForm';
import './NewWarehouse.scss';
import { postWarehouse } from '../../utils/api';

function NewWarehouse() {
	const [errorState, setErrorState] = useState({}); 

	const onSubmit = async (formData) => {
        try {
            const response = await postWarehouse(formData);
            console.log('Warehouse created:', response.data);
        } catch (error) {
            console.error('Error creating warehouse:', error.response?.data?.errors || error);
            if (error.response?.data?.errors) {
				throw error;  
			} else {
				alert("An unknown error occurred.");
			}
        }
    };

	return (
		<main>
			<div className='new-warehouse__header'>
				<SectionHeader
					text='Add New Warehouse'
					url='/'
				/>
			</div>
			<WarehouseForm
				onSubmitFunction={onSubmit}
			/>
		</main>
	);
}


export default NewWarehouse;
