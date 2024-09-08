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

		const newWarehouse = {
			warehouse_name: warehouse__name.value,
			address: warehouse__address.value,
			city: warehouse__city.value,
			country: warehouse__country.value,
			contact_name: contact__name.value,
			contact_position: contact__position.value,
			contact_phone: formattedPhoneNumber,
			contact_email: contact__email.value,
		};
        console.log(postWarehouse(newWarehouse));
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
