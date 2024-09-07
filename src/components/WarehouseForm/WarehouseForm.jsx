import React from 'react';
import './WarehouseForm.scss';
import { Link } from 'react-router-dom';
import { fetchWarehousesList } from '../../utils/api.js';
import { useEffect, useState } from 'react';

export default function WarehouseForm({ getClassName, onSubmitFunction }) {
	const [dropdownOptions, setDropdownOptions] = useState([]);

	async function editDropdown() {
		const responseData = await getWarehouseData();
		const warehouseNames = responseData.map(
			(warehouse) => warehouse.warehouse_name
		);

		console.log(warehouseNames);
		return warehouseNames.map((warehouseName) => (
			<option
				key={warehouseName}
				value={warehouseName}
			>
				{warehouseName}
			</option>
		));
	}

	const getWarehouseData = () => {
		const getResponse = async () => {
			try {
				const response = await fetchWarehousesList();
				const responseData = response.data;
				console.log(responseData);

				return responseData;
			} catch (error) {
				return console.error(error);
			}
		};
		return getResponse();
	};

	const warehouseNameOption = () => {
		if (getClassName === 'warehouse-edit') {
			return (
				<select
					id='warehouse-name'
					name='warehouse-name'
					required
				>
					<option
						value=''
						selected
						disabled
						hidden
					>
						Warehouse Name
					</option>
					{dropdownOptions}
				</select>
			);
		} else {
			return (
				<input
					type='text'
					name='warehouse-name'
					id='warehouse-name'
					placeholder='Warehouse Name'
					required
				/>
			);
		}
	};

	useEffect(() => {
		const fetchDropdownOptions = async () => {
			const dropdown = await editDropdown();
			setDropdownOptions(dropdown); //
		};

		if (getClassName === 'warehouse-edit') {
			fetchDropdownOptions();
		}
	}, []);

	return (
		<section>
			<form
				className='warehouse-form'
				onSubmit={onSubmitFunction}
				id='warehouse-form'
			>
				<div className='warehouse-form__details'>
					<h2 className='h2-subheader'>Warehouse Details</h2>
					<label htmlFor='warehouse-name'>
						<h3 className='h3-labels'>Warehouse Name</h3>
						{warehouseNameOption()}
					</label>
					<label htmlFor='warehouse-address'>
						<h3 className='h3-labels'>Street Address</h3>
						<input
							type='text'
							name='warehouse-address'
							id='warehouse-address'
							placeholder='Street Address'
							required
						/>
					</label>
					<label htmlFor='warehouse-city'>
						<h3 className='h3-labels'>City</h3>
						<input
							type='text'
							name='warehouse-city'
							id='warehouse-city'
							placeholder='City'
							required
						/>
					</label>
					<label htmlFor='warehouse-country'>
						<h3 className='h3-labels'>Country</h3>
						<input
							type='text'
							name='warehouse-country'
							id='warehouse-country'
							placeholder='Country'
							required
						/>
					</label>
				</div>
				<div className='warehouse-form__contact'>
					<h2 className='h2-subheader'>Contact Details</h2>
					<label htmlFor='contact-name'>
						<h3 className='h3-labels'>Contact Name</h3>
						<input
							type='text'
							name='contact-name'
							id='contact-name'
							placeholder='Contact Name'
							required
						/>
					</label>
					<label htmlFor='contact-position'>
						<h3 className='h3-labels'>Position</h3>
						<input
							type='text'
							name='contact-position'
							id='contact-position'
							placeholder='Position'
							required
						/>
					</label>
					<label htmlFor='contact-tel'>
						<h3 className='h3-labels'>Phone Number</h3>
						<input
							type='tel'
							name='contact-tel'
							id='contact-tel'
							placeholder='Phone Number'
							required
						/>
					</label>
					<label htmlFor='contact-email'>
						<h3 className='h3-labels'>Email</h3>
						<input
							type='email'
							name='contact-email'
							id='contact-email'
							placeholder='Email'
							required
						/>
					</label>
				</div>
			</form>
			<div className='warehouse-form__buttons'>
				<Link className='warehouse-form__buttons-cancel'>Cancel</Link>
				{/* Change buttons depending on what form */}
				<button className='warehouse-form__buttons-cancel'>
					Add Warehouse
				</button>
			</div>
		</section>
	);
}
