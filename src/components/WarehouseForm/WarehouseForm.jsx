import React from 'react';
import './WarehouseForm.scss';
import { Link } from 'react-router-dom';

export default function WarehouseForm({ className, onSubmitFunction }) {
	return (
		<main>
			<form
				className='warehouse-form'
				onSubmit={onSubmitFunction}
				id='warehouse-form'
			>
				<div>
					<h2>Warehouse Details</h2>
					<label htmlFor='warehouse-name'>
						<h3>Warehouse Name</h3>
						<input
							type='text'
							name='warehouse-name'
							id='warehouse-name'
							placeholder='Warehouse Name'
							required
						/>
					</label>
					<label htmlFor='warehouse-address'>
						<h3>Street Address</h3>
						<input
							type='text'
							name='warehouse-address'
							id='warehouse-address'
							placeholder='Street Address'
							required
						/>
					</label>
					<label htmlFor='warehouse-city'>
						<h3>City</h3>
						<input
							type='text'
							name='warehouse-city'
							id='warehouse-city'
							placeholder='City'
							required
						/>
					</label>
					<label htmlFor='warehouse-country'>
						<h3>Country</h3>
						<input
							type='text'
							name='warehouse-country'
							id='warehouse-country'
							placeholder='Country'
							required
						/>
					</label>
				</div>
				<div>
					<h2>Contact Details</h2>
					<label htmlFor='contact-name'>
						<h3>Contact Name</h3>
						<input
							type='text'
							name='contact-name'
							id='contact-name'
							placeholder='Contact Name'
							required
						/>
					</label>
					<label htmlFor='contact-position'>
						<h3>Position</h3>
						<input
							type='text'
							name='contact-position'
							id='contact-position'
							placeholder='Position'
							required
						/>
					</label>
					<label htmlFor='contact-tel'>
						<h3>Phone Number</h3>
						<input
							type='tel'
							name='contact-tel'
							id='contact-tel'
							placeholder='Phone Number'
							required
						/>
					</label>
					<label htmlFor='contact-email'>
						<h3>Email</h3>
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
			<div>
				<Link>Cancel</Link>
                {/* Change buttons depending on what form */}
				<button>Add Warehouse</button>
			</div>
		</main>
	);
}
