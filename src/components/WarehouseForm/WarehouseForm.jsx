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

	// async function editDropdown() {
	// 	const responseData = await getWarehouseData();
	// 	const warehouseNames = responseData.map(
	// 		(warehouse) => warehouse.warehouse_name
	// 	);

	// 	return warehouseNames.map((warehouseName) => (
	// 		<option
	// 			key={warehouseName}
	// 			value={warehouseName}
	// 		>
	// 			{warehouseName}
	// 		</option>
	// 	));
	// }

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
	 // Handle input changes
	const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


	const warehouseNameOption = () => {
		if (getClassName === 'warehouse-edit') {
            return (
                <select
                    id='warehouse_name'
                    name='warehouse_name'
                    value={formData.warehouse_name}
                    onChange={handleChange}
                    defaultValue="default"
                >
                    <option value='default' disabled hidden>Warehouse Name</option>
                    {dropdownOptions}
                </select>
            );
        } else {
            return (
                <input
                    type='text'
                    name='warehouse_name'
                    id='warehouse_name'
                    value={formData.warehouse_name}
                    onChange={handleChange}
                    placeholder='Warehouse Name'
                />
            );
        }
	};

	//I changed this to fetch warehouse names for dropdown if editing
	useEffect(() => {
        const fetchDropdownOptions = async () => {
            const responseData = await fetchWarehousesList();
            const options = responseData.data.map(warehouse => (
                <option key={warehouse.id} value={warehouse.warehouse_name}>
                    {warehouse.warehouse_name}
                </option>
            ));
            setDropdownOptions(options);
        };

        if (getClassName === 'warehouse-edit') {
            fetchDropdownOptions();
        }
    }, [getClassName]);

    const handleSubmit = (event) =>{
        event.preventDefault();
        onSubmitFunction(event);
    }


	return (
		<section>
			<form className='warehouse-form' onSubmit={handleSubmit} id='warehouse-form'>
                <div className='warehouse-form__details'>
                    <h2 className='h2-subheader'>Warehouse Details</h2>

                    <label htmlFor='warehouse_name'>
                        <h3 className='h3-labels'>Warehouse Name</h3>
                        {warehouseNameField()}
                    </label>

                    <label htmlFor='address'>
                        <h3 className='h3-labels'>Street Address</h3>
                        <input
                            type='text'
                            name='address'
                            id='address'
                            value={formData.address}
                            onChange={handleChange}
                            placeholder='Street Address'
                        />
                    </label>

                    <label htmlFor='city'>
                        <h3 className='h3-labels'>City</h3>
                        <input
                            type='text'
                            name='city'
                            id='city'
                            value={formData.city}
                            onChange={handleChange}
                            placeholder='City'
                        />
                    </label>

                    <label htmlFor='country'>
                        <h3 className='h3-labels'>Country</h3>
                        <input
                            type='text'
                            name='country'
                            id='country'
                            value={formData.country}
                            onChange={handleChange}
                            placeholder='Country'
                        />
                    </label>
                </div>

                <div className='warehouse-form__contact'>
                    <h2 className='h2-subheader'>Contact Details</h2>

                    <label htmlFor='contact_name'>
                        <h3 className='h3-labels'>Contact Name</h3>
                        <input
                            type='text'
                            name='contact_name'
                            id='contact_name'
                            value={formData.contact_name}
                            onChange={handleChange}
                            placeholder='Contact Name'
                        />
                    </label>

                    <label htmlFor='contact_position'>
                        <h3 className='h3-labels'>Position</h3>
                        <input
                            type='text'
                            name='contact_position'
                            id='contact_position'
                            value={formData.contact_position}
                            onChange={handleChange}
                            placeholder='Position'
                        />
                    </label>

                    <label htmlFor='contact_phone'>
                        <h3 className='h3-labels'>Phone Number</h3>
                        <input
                            type='text'
                            name='contact_phone'
                            id='contact_phone'
                            value={formData.contact_phone}
                            onChange={handleChange}
                            placeholder='Phone Number'
                        />
                    </label>

                    <label htmlFor='contact_email'>
                        <h3 className='h3-labels'>Email</h3>
                        <input
                            type='text'
                            name='contact_email'
                            id='contact_email'
                            value={formData.contact_email}
                            onChange={handleChange}
                            placeholder='Email'
                        />
                    </label>
                </div>

                <div className='warehouse-form__buttons'>
                    <Link to='/' className='warehouse-form__buttons-cancel'>
                        Cancel
                    </Link>
                    <button className='warehouse-form__buttons-submit' type='submit'>
                        {getClassName === 'warehouse-edit' ? 'Update Warehouse' : 'Add Warehouse'}
                    </button>
                </div>
            </form>
		</section>
	);
}
