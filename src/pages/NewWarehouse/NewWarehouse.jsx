import React from 'react';
import SectionHeader from '../../components/LowLevelComponents/SectionHeader/SectionHeader';
import WarehouseForm from '../../components/WarehouseForm/WarehouseForm';
import './NewWarehouse.scss';
import { postWarehouse } from '../../utils/api';

function NewWarehouse() {
	const validateEmail = (email) => {
		const emailValidator = /[*\S]+@[*\S]+\.[*\S]/;
		if (!emailValidator.test(email)) {
			return false;
		}
		return true;
	};

	const validatePhone = (phone) => {
		const phoneValidator = /^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/;
		let phoneNumber = '';

		phone
			.replaceAll(' ', '')
			.replaceAll('+', '')
			.replaceAll('(', '')
			.replaceAll(')', '');

		if (phone.length === 10) {
			phoneNumber =
				'+1 (' +
				phone.substring(0, 3) +
				') ' +
				phone.substring(3, 6) +
				'-' +
				phone.substring(6);
			if (!phoneValidator.test(phoneNumber)) {
				return false;
			}
		} else if (phone.length === 11) {
			phoneNumber =
				'+1 (' +
				phone.substring(1, 4) +
				') ' +
				phone.substring(4, 7) +
				'-' +
				phone.substring(7);
			if (!phoneValidator.test(phoneNumber)) {
				return false;
			}
		} else {
			return false;
		}
        return phoneNumber;
	};

	const onSubmit = (event) => {
		const {
			warehouse__name,
			warehouse__address,
			warehouse__city,
			warehouse__country,
			contact__name,
			contact__position,
			contact__tel,
			contact__email,
		} = event.target;

		if (
			!warehouse__name.value ||
			!warehouse__address.value ||
			!warehouse__city.value ||
			!warehouse__country.value ||
			!contact__name.value ||
			!contact__position.value ||
			!contact__tel.value ||
			!contact__email.value
		) {
			return console.log('Invalid Input.');
		} else if (!validateEmail(contact__email.value)) {
			return console.log('Invalid Email');
		}

        const formattedPhoneNumber = validatePhone(contact__tel.value);

        if(!formattedPhoneNumber){
            return console.log("Invalid Phone Number.");
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
				getClassName='warehouse-add'
				onSubmitFunction={onSubmit}
			/>
		</main>
	);
}

export default NewWarehouse;
