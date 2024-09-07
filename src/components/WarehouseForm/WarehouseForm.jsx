import React from 'react';
import './WarehouseForm.scss';
import { Link } from 'react-router-dom';
import { fetchWarehousesList } from '../../utils/api.js';
import { useEffect, useState } from 'react';

export default function WarehouseForm({ getClassName, onSubmitFunction,initialData }) {
	const [dropdownOptions, setDropdownOptions] = useState([]);
	const [formData, setFormData] = useState({
        warehouse_name: '',
        address: '',
        city: '',
        country: '',
        contact_name: '',
        contact_position: '',
        contact_phone: '',
        contact_email: ''
    });
	// Pre-populate form data if initialData is provided (for edit mode)
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);
	async function editDropdown() {
		const responseData = await getWarehouseData();
		const warehouseNames = responseData.map(
			(warehouse) => warehouse.warehouse_name
		);

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
					id='warehouse__name'
					name='warehouse__name'
                    defaultValue="default"
					
				>
					<option
						value='default'
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
					name='warehouse__name'
					id='warehouse__name'
					placeholder='Warehouse Name'
					
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

    const handleSubmit = (event) =>{
        event.preventDefault();
        onSubmitFunction(event);
    }


	return (
		<section>
			<form
				className='warehouse-form'
				onSubmit={handleSubmit}
				id='warehouse-form'
			>
				<div className='warehouse-form__details'>
					<h2 className='h2-subheader'>Warehouse Details</h2>
					<label htmlFor='warehouse__name'>
						<h3 className='h3-labels'>Warehouse Name</h3>
						{warehouseNameOption()}
					</label>
					<label htmlFor='warehouse__address'>
						<h3 className='h3-labels'>Street Address</h3>
						<input
							type='text'
							name='warehouse__address'
							id='warehouse__address'
							placeholder='Street Address'
							
						/>
					</label>
					<label htmlFor='warehouse__city'>
						<h3 className='h3-labels'>City</h3>
						<input
							type='text'
							name='warehouse__city'
							id='warehouse__city'
							placeholder='City'
							
						/>
					</label>
					<label htmlFor='warehouse__country'>
						<h3 className='h3-labels'>Country</h3>
						<input
							type='text'
							name='warehouse__country'
							id='warehouse__country'
							placeholder='Country'
							
						/>
					</label>
				</div>
				<div className='warehouse-form__contact'>
					<h2 className='h2-subheader'>Contact Details</h2>
					<label htmlFor='contact__name'>
						<h3 className='h3-labels'>Contact Name</h3>
						<input
							type='text'
							name='contact__name'
							id='contact__name'
							placeholder='Contact Name'
							
						/>
					</label>
					<label htmlFor='contact__position'>
						<h3 className='h3-labels'>Position</h3>
						<input
							type='text'
							name='contact__position'
							id='contact__position'
							placeholder='Position'
							
						/>
					</label>
					<label htmlFor='contact__tel'>
						<h3 className='h3-labels'>Phone Number</h3>
						<input
							type='text'
							name='contact__tel'
							id='contact__tel'
							placeholder='Phone Number'
							
						/>
					</label>
					<label htmlFor='contact__email'>
						<h3 className='h3-labels'>Email</h3>
						<input
							type='text'
							name='contact__email'
							id='contact__email'
							placeholder='Email'
							
						/>
					</label>
				</div>
			</form>
			<div className='warehouse-form__buttons'>
				<Link className='warehouse-form__buttons-cancel'>Cancel</Link>
				{/* Change buttons depending on what form */}
				<button
					className='warehouse-form__buttons-cancel'
					form='warehouse-form'
					type='submit'
				>
					Add Warehouse
				</button>
			</div>
		</section>
	);
}
