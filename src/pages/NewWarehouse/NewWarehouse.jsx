import React from 'react';
import { useState } from 'react';
import SectionHeader from '../../components/LowLevelComponents/SectionHeader/SectionHeader';
import WarehouseForm from '../../components/WarehouseForm/WarehouseForm';
import './NewWarehouse.scss';
import { postWarehouse } from '../../utils/api';

function NewWarehouse() {
	// const validateEmail = (email) => {
	// 	const emailValidator = /[*\S]+@[*\S]+\.[*\S]/;
	// 	if (!emailValidator.test(email)) {
	// 		return false;
	// 	}
	// 	return true;
	// };

	// const validatePhone = (phone) => {
	// 	const phoneValidator = /^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/;
	// 	let phoneNumber = '';

	// 	phone
	// 		.replaceAll(' ', '')
	// 		.replaceAll('+', '')
	// 		.replaceAll('(', '')
	// 		.replaceAll(')', '');

	// 	if (phone.length === 10) {
	// 		phoneNumber =
	// 			'+1 (' +
	// 			phone.substring(0, 3) +
	// 			') ' +
	// 			phone.substring(3, 6) +
	// 			'-' +
	// 			phone.substring(6);
	// 		if (!phoneValidator.test(phoneNumber)) {
	// 			return false;
	// 		}
	// 	} else if (phone.length === 11) {
	// 		phoneNumber =
	// 			'+1 (' +
	// 			phone.substring(1, 4) +
	// 			') ' +
	// 			phone.substring(4, 7) +
	// 			'-' +
	// 			phone.substring(7);
	// 		if (!phoneValidator.test(phoneNumber)) {
	// 			return false;
	// 		}
	// 	} else {
	// 		return false;
	// 	}
    //     return phoneNumber;
	// };
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
