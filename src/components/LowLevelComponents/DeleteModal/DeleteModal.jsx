import React from 'React';
import './DeleteModal.scss';

export default function DeleteModal({
	deleteType,
	deleteName,
	onDeleteSubmit,
}) {
	return (
		<section>
			<div>
				<h1>
					Delete {deleteName} {deleteType}?
				</h1>
				<p>
					Please confirm that you’d like to delete the {deleteName}{' '}
					from the list of {deleteType}s. You won’t be able to undo
					this action.
				</p>
				<div>
					<button>Cancel</button>
					<button onSubmit={onDeleteSubmit}>Delete</button>
				</div>
			</div>
		</section>
	);
}

//Delete type should be 'warehouse' or 'inventory item' to ensure proper output
