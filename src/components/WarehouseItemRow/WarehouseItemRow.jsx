import React from 'react';
import './WarehouseItemRow.scss';
import { useMediaQuery } from 'react-responsive';
import chevronIcon from '../../assets/Icons/chevron_right-24px.svg';
import deleteIcon from '../../assets/Icons/delete_outline-24px.svg';
import editIcon from '../../assets/Icons/edit-24px.svg';
import { Link } from 'react-router-dom';

function WarehouseItemRow({ warehouse }) {
	const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

	// Mobile view component for Warehouse Item
	const MobileView = ({ warehouse }) => {
		return (
			<div className='warehouse-item-row'>
				<div className='warehouse-item'>
					<div className='warehouse-item__name'>
						<div
							data-label='warehouse'
							className='warehouse-name'
						>
							<label>WAREHOUSE</label>
							<Link
								to='/'
								className='warehouse-item__name-link h3-links'
								href='#'
							>
								{warehouse.warehouse_name}
								<img
									src={chevronIcon}
									alt='Chevron Icon'
								/>
							</Link>
						</div>
            <label>ADDRESS</label>
						<div data-label='Address'>
							{warehouse.address}, {warehouse.city},{' '}
							{warehouse.country}
						</div>
					</div>
					<div className='warehouse-item__details'>
						<label>CONTACT NAME</label>
						<div data-label='Contact Name'>
							{warehouse.contact_name}
						</div>
						<div
							data-label='Contact Information'
							className='warehouse-item__contact-info'
						>
							<label>CONTACT INFORMATION</label>
							<p className='warehouse-item__contact-info--phone'>
								{warehouse.contact_phone}
							</p>
							<p className='warehouse-item__contact-info--email'>
								{warehouse.contact_email}
							</p>
						</div>
					</div>
				</div>
				<div className='warehouse-actions'>
					<div className='warehouse-actions__wrapper'>
						<Link
							to='/'
							className='warehouse-delete-btn'
						>
							<img
								src={deleteIcon}
								alt='Delete button'
							/>
						</Link>
						<Link
							to='/'
							className='warehouse-edit-btn'
						>
							<img
								src={editIcon}
								alt='Edit button'
							/>
						</Link>
					</div>
				</div>
			</div>
		);
	};

	// Desktop view component for Warehouse Item
	const DesktopView = ({ warehouse }) => {
		return (
			<>
				<tr className='warehouse-item-row'>
					<td className='warehouse-item__name'>
						<Link
							to='/'
							className='warehouse-item__name-link'
						>
							{warehouse.warehouse_name}{' '}
							<img
								className='warehouse-icon'
								src={chevronIcon}
								alt='Chevron Icon'
							/>
						</Link>
					</td>
					<td className='warehouse-item__address'>
						{warehouse.address}, {warehouse.city},{' '}
						{warehouse.country}
					</td>
					<td className='warehouse-item__contact-name'>
						{warehouse.contact_name}
					</td>
					<td className='warehouse-item__contact-info'>
						<div className='warehouse-item__contact-info--phone'>
							{warehouse.contact_phone}
						</div>
						<div className='warehouse-item__contact-info--email'>
							{warehouse.contact_email}
						</div>
					</td>
					<td className='warehouse-actions'>
						<button className='warehouse-delete-btn'>
							<img
								src={deleteIcon}
								alt='Delete button'
							/>
						</button>
						<button className='warehouse-edit-btn'>
							<img
								src={editIcon}
								alt='Edit button'
							/>
						</button>
					</td>
				</tr>
			</>
		);
	};

	// Render based on screen size
	return (
		<>
			{isDesktop ? (
				<DesktopView warehouse={warehouse} />
			) : (
				<MobileView warehouse={warehouse} />
			)}
		</>
	);
}

export default WarehouseItemRow;
