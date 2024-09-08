import React, { useEffect, useState } from 'react';
import './WarehouseForm.scss';
import CTAButton from '../LowLevelComponents/CTAButton/CTAButton.jsx';
import { Link } from 'react-router-dom';
import { fetchWarehouseList } from '/src/utils/api.js';
import { useEffect, useState } from 'react';
import errorIcon from '../../assets/Icons/error-24px.svg';


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
	//add error state
	const [errorState, setErrorState] = useState({});

	// Pre-populate form data if initialData is provided (for edit mode)
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);


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
				const response = await fetchWarehouseList();
				const responseData = response.data;

				return responseData;
			} catch (error) {
				return console.error(error);

	// Handle input changes
	const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
		// Clear error message when user starts typing
        setErrorState({
            ...errorState,
            [name]: ''
        });
    };
	const validateForm = () => {
		let errors = {};
		const requiredFields = [
			'warehouse_name',
			'address',
			'city',
			'country',
			'contact_name',
			'contact_position',
			'contact_phone',
			'contact_email'
		];
	
		// Loop through each required field and check if it's empty
		requiredFields.forEach(field => {
			if (!formData[field]) {
				errors[field] = "This field is required";

			}
		});
		setErrorState(errors);
	
		return Object.keys(errors).length === 0; 
	};

	// Submit the form
	const handleSubmit = async (event) =>{
        event.preventDefault();
        if (validateForm()) {
			try{
				await onSubmitFunction(formData); 
			}
			catch (error){
				const backendErrors = error.response?.data?.errors;
				setErrorState(prevErrorState => ({
					...prevErrorState,
					...backendErrors  
				}));
			}
			
		}
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
							className={errorState.warehouse_name ? 'input-error' : ''}
						/>
						{errorState.warehouse_name && (<div className="error-message-container">
							<img className="error-icon" src={errorIcon} alt="error icon" /> <p className="error-text">{errorState.warehouse_name}</p>
						</div>
							
						)}
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
							className={errorState.address ? 'input-error' : ''}
						/>
						{errorState.address && (
							<div className="error-message-container">
							<img className="error-icon" src={errorIcon} alt="error icon" /> <p className="error-text">{errorState.address}</p>
						</div>
							
						)}
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
							className={errorState.city ? 'input-error' : ''}
						/>
						{errorState.city && (
							<div className="error-message-container">
							<img className="error-icon" src={errorIcon} alt="error icon" /> <p className="error-text">{errorState.city}</p>
						</div>
							
						)}
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
							className={errorState.country ? 'input-error' : ''}
						/>
						{errorState.country && (
							<div className="error-message-container">
							<img className="error-icon" src={errorIcon} alt="error icon" /> <p className="error-text">{errorState.country}</p>
						</div>
							
						)}
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
							className={errorState.contact_name ? 'input-error' : ''}
						/>
						{errorState.contact_name && (
							<div className="error-message-container">
							<img className="error-icon" src={errorIcon} alt="error icon" /> <p className="error-text">{errorState.contact_name}</p>
						</div>
							
						)}
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
							className={errorState.contact_position ? 'input-error' : ''}
						/>
						{errorState.contact_position && (
							<div className="error-message-container">
							<img className="error-icon" src={errorIcon} alt="error icon" /> <p className="error-text">{errorState.contact_position}</p>
						</div>
							
						)}
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
							className={errorState.contact_phone ? 'input-error' : ''}
						/>
						{errorState.contact_phone && (
							<div className="error-message-container">
							<img className="error-icon" src={errorIcon} alt="error icon" /> <p className="error-text">{errorState.contact_phone}</p>
						</div>
							
						)}
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
							className={errorState.contact_email ? 'input-error' : ''}
						/>
						{errorState.contact_email && (
							
							<div className="error-message-container">
							<img className="error-icon" src={errorIcon} alt="error icon" /> <p className="error-text">{errorState.contact_email}</p>
						</div>
						)}
					</label>
				</div>
			</div>

			<div className='warehouse-form__buttons'>
				<Link to='/' className='warehouse-form__buttons-cancel'>
					<CTAButton variant='secondary' text='Cancel' /> 
				</Link>
				{initialData  ? (
                            <CTAButton
                                variant='primary'
                                text='Save'
                                onClick={handleSubmit}
                            />
                        ) : (
                            <CTAButton
                                variant='primary'
                                text='+ Add Warehouse'
                                onClick={handleSubmit}
                            />
                        )}
			</div>
		</form>
	</section>
	);
}
