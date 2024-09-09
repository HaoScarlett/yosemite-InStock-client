import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';

// Validation schema using Yup
const warehouseSchema = yup.object().shape({
	warehouse_name: yup.string().required('Warehouse name is required'),
	address: yup.string().required('Address is required'),
	city: yup.string().required('City is required'),
	country: yup.string().required('Country is required'),
	contact_name: yup.string().required('Contact name is required'),
	contact_position: yup.string().required('Contact position is required'),
	contact_phone: yup
		.string()
		.matches(/^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/, 'Phone number is not valid')
		.required('Phone number is required'),
	contact_email: yup
		.string()
		.email('Email is not valid')
		.required('Email is required'),
});

function WarehouseForm({ warehouseId, initialData = null }) {
	const [formData, setFormData] = useState({
		warehouse_name: '',
		address: '',
		city: '',
		country: '',
		contact_name: '',
		contact_position: '',
		contact_phone: '',
		contact_email: '',
	});

	const [errors, setErrors] = useState({});
	const history = useHistory();

	// If editing, pre-populate form with existing data
	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Validate form data
	const validateForm = async () => {
		try {
			await warehouseSchema.validate(formData, { abortEarly: false });
			setErrors({});
			return true;
		} catch (validationErrors) {
			const formattedErrors = {};
			validationErrors.inner.forEach((error) => {
				formattedErrors[error.path] = error.message;
			});
			setErrors(formattedErrors);
			return false;
		}
	};

	// Handle form submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		const isValid = await validateForm();

		if (isValid) {
			const apiUrl = warehouseId
				? `${process.env.REACT_APP_API_URL}/api/warehouses/${warehouseId}`
				: `${process.env.REACT_APP_API_URL}/api/warehouses`;

			const method = warehouseId ? 'PUT' : 'POST';

			try {
				const response = await fetch(apiUrl, {
					method: method,
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formData),
				});

				if (response.ok) {
					alert('Warehouse saved successfully!');
					history.push('/warehouses');
				} else {
					const errorData = await response.json();
					alert(`Error: ${errorData.message}`);
				}
			} catch (error) {
				console.error('Error saving warehouse:', error);
				alert('An error occurred while saving the warehouse.');
			}
		}
	};

	return (
		<div className='warehouse-form'>
			<h2>{warehouseId ? 'Edit Warehouse' : 'Add Warehouse'}</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<h2>Warehouse Details</h2>
					<label>Warehouse Name</label>
					<input
						type='text'
						name='warehouse_name'
						value={formData.warehouse_name}
						onChange={handleChange}
					/>
					{errors.warehouse_name && <p>{errors.warehouse_name}</p>}
				</div>

				<div>
					<label>Street Address</label>
					<input
						type='text'
						name='address'
						value={formData.address}
						onChange={handleChange}
					/>
					{errors.address && <p>{errors.address}</p>}
				</div>

				<div>
					<label>City</label>
					<input
						type='text'
						name='city'
						value={formData.city}
						onChange={handleChange}
					/>
					{errors.city && <p>{errors.city}</p>}
				</div>

				<div>
					<label>Country</label>
					<input
						type='text'
						name='country'
						value={formData.country}
						onChange={handleChange}
					/>
					{errors.country && <p>{errors.country}</p>}
				</div>

				<h2>Contact Details</h2>
				<div>
					<label>Contact Name</label>
					<input
						type='text'
						name='contact_name'
						value={formData.contact_name}
						onChange={handleChange}
					/>
					{errors.contact_name && <p>{errors.contact_name}</p>}
				</div>

				<div>
					<label>Position</label>
					<input
						type='text'
						name='contact_position'
						value={formData.contact_position}
						onChange={handleChange}
					/>
					{errors.contact_position && (
						<p>{errors.contact_position}</p>
					)}
				</div>

				<div>
					<label>Phone Number</label>
					<input
						type='text'
						name='contact_phone'
						value={formData.contact_phone}
						onChange={handleChange}
					/>
					{errors.contact_phone && <p>{errors.contact_phone}</p>}
				</div>

				<div>
					<label>Email</label>
					<input
						type='email'
						name='contact_email'
						value={formData.contact_email}
						onChange={handleChange}
					/>
					{errors.contact_email && <p>{errors.contact_email}</p>}
				</div>

				<button type='submit'>
					{warehouseId ? 'Update Warehouse' : 'Add Warehouse'}
				</button>
			</form>
		</div>
	);
}

export default WarehouseForm;
