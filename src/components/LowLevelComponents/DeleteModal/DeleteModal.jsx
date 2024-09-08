import React from 'react';
import './DeleteModal.scss';
import deleteIcon from '../../../assets/Icons/close-24px.svg';

export default function DeleteModal({
	deleteType,
	deleteName,
	onDeleteSubmit,
}) {
	return (
		<section className='modal__container'>
			<div className='modal__content'>
				<div>
					<img
						className='modal__content-close'
						src={deleteIcon}
						alt='Grey x.'
					/>
					<h1 className='h1-page-header '>
						Delete {deleteName} {deleteType}?
					</h1>
					<p className='p2-body-medium'>
						Please confirm that you’d like to delete the{' '}
						{deleteName} from the list of {deleteType}s. You won’t
						be able to undo this action.
					</p>
				</div>
				<div className='modal__content-buttons'>
					<button className='modal__cancel-btn'>Cancel</button>
					<button className='modal__delete-btn' onSubmit={onDeleteSubmit}>Delete</button>
				</div>
			</div>
		</section>
	);
}

//Delete type should be 'warehouse' or 'inventory item' to ensure proper output
