import React, { useState } from 'react';
import SectionHeader from '../../components/LowLevelComponents/SectionHeader/SectionHeader';
import WarehouseForm from '../../components/WarehouseForm/WarehouseForm';
import './NewWarehouse.scss';
import { postWarehouse } from '../../utils/api';

function NewWarehouse() {
	const [errorState, setErrorState] = useState({});

	const onSubmit = async (formData) => {
		try {
			const newWarehouse = {
				warehouse_name: formData.warehouse_name,
				address: formData.address,
				city: formData.city,
				country: formData.country,
				contact_name: formData.contact_name,
				contact_position: formData.contact_position,
				contact_phone: formData.contact_phone,
				contact_email: formData.contact_email,
			};

			const response = await postWarehouse(newWarehouse);
			console.log('Warehouse created:', response.data);
		} catch (error) {
			console.error(
				'Error creating warehouse:',
				error.response?.data?.errors || error
			);
			if (error.response?.data?.errors) {
				setErrorState(error.response.data.errors);
				throw error;
			} else {
				alert('An unknown error occurred.');
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
			<WarehouseForm onSubmitFunction={onSubmit} />
		</main>
	);
}

export default NewWarehouse;
