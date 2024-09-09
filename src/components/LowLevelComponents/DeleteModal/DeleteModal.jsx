import React from 'react';
import './DeleteModal.scss';
import deleteIcon from '../../../assets/Icons/close-24px.svg';

export default function DeleteModal({
	deleteType,
	deleteName,
	onDeleteSubmit,
	closeModal,
}) {
	return (
		<div className='modal__overlay'>
			<section className='modal__container'>
				<div className='modal__content'>
					<div>
						<div className='modal__content-close'>
							<button onClick={closeModal}>
								<img
									src={deleteIcon}
									alt='Grey x.'
								/>
							</button>
						</div>

						<div className='modal__content-text'>
							<h1 className='h1-page-header '>
								Delete {deleteName} {deleteType}?
							</h1>
							<p className='p2-body-medium'>
								Please confirm that you’d like to delete the{' '}
								{deleteName} from the list of {deleteType}s. You
								won’t be able to undo this action.
							</p>
						</div>
					</div>
					<div className='modal__content-buttons'>
						<button
							className='modal__cancel-btn'
							onClick={closeModal}
						>
							Cancel
						</button>
						<button
							className='modal__delete-btn'
							onClick={onDeleteSubmit}
						>
							Delete
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}

