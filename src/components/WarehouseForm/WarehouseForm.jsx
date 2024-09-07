import React, { useEffect, useState } from 'react';
import './WarehouseForm.scss';
import CTAButton from '../LowLevelComponents/CTAButton/CTAButton.jsx';
import { Link } from 'react-router-dom';

export default function WarehouseForm({ onSubmitFunction, initialData }) {
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

	// Handle input changes
	const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

	// Submit the form
	const handleSubmit = (event) =>{
        event.preventDefault();
        onSubmitFunction(formData); // Pass the form data to the submit function
    }

	return (
		<section>
			<form className='warehouse-form' onSubmit={handleSubmit} id='warehouse-form'>
				<div className='warehouse-form__container'>
					<div className='warehouse-form__details'>
						<h2 className='h2-subheader'>Warehouse Details</h2>

						<label htmlFor='warehouse_name'>
							<h3 className='h3-labels'>Warehouse Name</h3>
							<input
								type='text'
								name='warehouse_name'
								id='warehouse_name'
								value={formData.warehouse_name}
								onChange={handleChange}
								placeholder='Warehouse Name'
							/>
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
				</div>

				<div className='warehouse-form__buttons'>
					<Link to='/' className='warehouse-form__buttons-cancel'>
						<CTAButton variant='secondary' text='Cancel' /> 
					</Link>
					<CTAButton
						variant='primary'
						text='Save'
						onClick={handleSubmit} 
					/>
				</div>
			</form>
		</section>
	);
}
