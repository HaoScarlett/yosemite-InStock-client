import React from 'react';
import DeleteModal from '../components/LowLevelComponents/DeleteModal/DeleteModal';
import {useState} from 'react';

export default function Tester(){

    const [isModalOpen, setIsModalOpen] = useState(false);

	// Functions to open and close the modal
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const onDeleteSubmit = () => {
		console.log('Submitted');
	};


    return <>
    
    <button onClick={openModal}>Click me</button>

    {isModalOpen && (
				<div className='modal-overlay'>
					<DeleteModal
						deleteType='inventory item'
						deleteName='Placeholder Name'
						onDeleteSubmit={onDeleteSubmit}
					/>
				</div>
			)}
    </>
}