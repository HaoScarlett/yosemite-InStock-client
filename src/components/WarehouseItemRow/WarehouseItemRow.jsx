import React from 'react';
import { useState } from 'react';
import './WarehouseItemRow.scss';
import { useMediaQuery } from 'react-responsive';
import chevronIcon from '../../assets/Icons/chevron_right-24px.svg';
import deleteIcon from '../../assets/Icons/delete_outline-24px.svg';
import editIcon from '../../assets/Icons/edit-24px.svg';
import { Link } from 'react-router-dom';
import { deleteWarehouse } from '../../utils/api';
import DeleteModal from '../LowLevelComponents/DeleteModal/DeleteModal';

function WarehouseItemRow({
	warehouse,
	handleWarehouseClick,
	handleDeletedItem,
}) {
	const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const onDeleteSubmit = async () => {
		try {
			// Await the asynchronous delete operation
			const response = await deleteWarehouse(warehouse.id);
			console.log('Item deleted successfully:', response.data);

			console.log('Submitted');
			closeModal();
			handleDeletedItem();
		} catch (error) {
			console.error('Error deleting item:', error);
		}
	};

	// Mobile view component for Warehouse Item
	const MobileView = ({ warehouse }) => {
		return (
			<div className='warehouse-item-row'>
				<div className='warehouse-item'>
					<div className='warehouse-item__name'>
						<div
							data-label='warehouse'
							className='warehouse-name'
							onClick={() => handleWarehouseClick(warehouse.id)}
						>
							<label>WAREHOUSE</label>
							{warehouse.warehouse_name}
							<img
							className='name-icon'
								src={chevronIcon}
								alt='Chevron Icon'
							/>
						</div>
						<label>ADDRESS</label>
						<div
							data-label='Address'
							className='p2-body-medium'
						>
							{warehouse.address}, {warehouse.city},{' '}
							{warehouse.country}
						</div>
					</div>
					<div className='warehouse-item__details'>
						<label>CONTACT NAME</label>
						<div
							data-label='Contact Name'
							className='p2-body-medium'
						>
							{warehouse.contact_name}
						</div>
						<div
							data-label='Contact Information'
							className='warehouse-item__contact-info'
						>
							<label>CONTACT INFORMATION</label>
							<p className='warehouse-item__contact-info--phone p2-body-medium'>
								{warehouse.contact_phone}
							</p>
							<p className='warehouse-item__contact-info--email p2-body-medium'>
								{warehouse.contact_email}
							</p>
						</div>
					</div>
				</div>
				<div className='warehouse-actions'>
					<div className='warehouse-actions__wrapper'>
						<button
							onClick={openModal}
							className='warehouse-delete-btn'
						>
							<img
								src={deleteIcon}
								alt='Delete button'
							/>
						</button>
						<Link
							to={`warehouses/${warehouse.id}/edit`}
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
					<td
						className='warehouse-item__name p2-body-medium'
						onClick={() => handleWarehouseClick(warehouse.id)}
					>
						<div>
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
						</div>
					</td>
					<td className='warehouse-item__address p2-body-medium'>
						{warehouse.address}, {warehouse.city},{' '}
						{warehouse.country}
					</td>
					<td className='warehouse-item__contact-name p2-body-medium'>
						{warehouse.contact_name}
					</td>
					<td className='warehouse-item__contact-info p2-body-medium'>
						<div className='warehouse-item__contact-info--phone'>
							{warehouse.contact_phone}
						</div>
						<div className='warehouse-item__contact-info--email p2-body-medium'>
							{warehouse.contact_email}
						</div>
					</td>
					<td>
						<div className='warehouse-actions'>
							<button
								onClick={openModal}
								className='warehouse-delete-btn'
							>
								<img
									src={deleteIcon}
									alt='Delete button'
								/>
							</button>
							<Link
								to={`warehouses/${warehouse.id}/edit`}
								className='warehouse-edit-btn'
							>
								<img
									src={editIcon}
									alt='Edit button'
								/>
							</Link>
						</div>
					</td>
				</tr>
			</>
		);
	};

	// Render based on screen size
	return (
		<>
			{isModalOpen && (
				<div className='modal-overlay'>
					<DeleteModal
						deleteType='warehouse'
						deleteName={warehouse.warehouse_name}
						onDeleteSubmit={onDeleteSubmit}
						closeModal={closeModal}
					/>
				</div>
			)}
			{isDesktop ? (
				<DesktopView warehouse={warehouse} />
			) : (
				<MobileView warehouse={warehouse} />
			)}
		</>
	);
}

export default WarehouseItemRow;
