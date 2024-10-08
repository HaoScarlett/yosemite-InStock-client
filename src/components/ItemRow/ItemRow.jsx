import React from 'react';
import './ItemRow.scss';
import chevronIcon from '../../assets/Icons/chevron_right-24px.svg';
import { useMediaQuery } from 'react-responsive';
import deleteIcon from '../../assets/Icons/delete_outline-24px.svg';
import editIcon from '../../assets/Icons/edit-24px.svg';
import InOutStock from '../LowLevelComponents/InOutStock/InOutStock.jsx';
import DeleteModal from '../LowLevelComponents/DeleteModal/DeleteModal.jsx';
import { useState } from 'react';
import { deleteInventoryItem } from '../../utils/api.js';
import { Link } from 'react-router-dom';

function ItemRow({
	item,
	showWarehouse,
	onItemClick,
	handleDelete,
	warehouseName,
}) {
	const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
	const inStock = item.status === 'In Stock';
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const onDeleteSubmit = async () => {
		try {
			// Await the asynchronous delete operation
			const response = await deleteInventoryItem(item.id);
			closeModal();
			handleDelete();
		} catch (error) {
			console.error('Error deleting item:', error);
		}
	};

	const mobileWarehouseName = () => {
		if (!item.warehouse_name) {
			return;
		} else {
			return <span data-label='WAREHOUSE'>{item.warehouse_name}</span>;
		}
	};

	const desktopWarehouseName = () => {
		if (!item.warehouse_name) {
			return;
		} else {
			return (
				<td className='inventory-item__warehouse'>
					{item.warehouse_name}
				</td>
			);
		}
	};
	const MobileView = ({ item }) => {
		return (
			<>
				<div className='item-row'>
					<div className='inventory-item'>
						<div
							className='inventory-item__name'
							onClick={() => onItemClick(item.id)}
						>
							<span data-label='INVENTORY ITEM'>
								<Link
									className='item-name h3-links'
									to={`/inventory/${item.id}`}
								>
									{item.item_name}
								</Link>
								<img
									className='icon'
									src={chevronIcon}
									alt=''
								/>
							</span>
							<span data-label='CATEGORY'>{item.category}</span>
						</div>
						<div className='inventory-item__details'>
							<span
								data-label='STATUS'
								className='status'
							>
								<InOutStock inStock={inStock} />
							</span>
							<span data-label='QTY'>{item.quantity}</span>
							{mobileWarehouseName()}
						</div>
					</div>
					<div className='actions'>
						<span
							data-label='ACTIONS'
							className='actions__wrapper'
						>
							<button
								className='delete-btn'
								onClick={openModal}
							>
								<img
									src={deleteIcon}
									alt='delete button'
								/>
							</button>
							<Link to='inventory/:id/edit'>
								<button className='edit-btn'>
									<img
										src={editIcon}
										alt='edit button'
									/>
								</button>
							</Link>
						</span>
					</div>
				</div>
			</>
		);
	};

	const DesktopView = ({ item }) => {
		return (
			<tr className='item-row'>
				<td
					className='inventory-item__name'
					onClick={() => onItemClick(item.id)}
				>
					<Link
						className='item-name'
						to={`/inventory/${item.id}`}
					>
						{item.item_name}
					</Link>
					<img
						className='icon'
						src={chevronIcon}
						alt='chevron icon'
					/>
				</td>
				<td className='inventory-item__category'>{item.category}</td>
				<td className='inventory-item__status status'>
					<InOutStock inStock={inStock} />
				</td>
				<td className='inventory-item__quantity'>{item.quantity}</td>
				{desktopWarehouseName()}
				<td className='actions'>
					<button
						className='delete-btn'
						onClick={openModal}
					>
						<img
							src={deleteIcon}
							alt='delete button'
						/>
					</button>
					<Link to={`/inventory/${item.id}/edit`}>
						<button className='edit-btn'>
							<img
								src={editIcon}
								alt='edit button'
							/>
						</button>
					</Link>
				</td>
			</tr>
		);
	};

	return (
		<>
			{isModalOpen && (
				<div className='modal-overlay'>
					<DeleteModal
						deleteType='inventory item'
						deleteName={item.item_name}
						onDeleteSubmit={onDeleteSubmit}
						closeModal={closeModal}
					/>
				</div>
			)}
			{isDesktop ? (
				<DesktopView
					item={item}
					showWarehouse={showWarehouse}
				/>
			) : (
				<MobileView
					item={item}
					showWarehouse={showWarehouse}
				/>
			)}
		</>
	);
}

export default ItemRow;
