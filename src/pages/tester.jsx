import React from 'react';
import DeleteModal from '../components/LowLevelComponents/DeleteModal/DeleteModal';
import { useState,useEffect } from 'react';
import InventoryList from '../components/InventoryList/InventoryList';
import { fetchInventoryList, fetchInventoryItem } from '../utils/api.js';
import {useParams} from 'react-router-dom';


export default function Tester() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const onDeleteSubmit = () => {
		console.log('Submitted');
	};

	const [inventoryList, setInventoryList] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		console.log('Fetching inventory list');
		const fetchData = async () => {
			if (!id) {
				setIsLoading(true);
				try {
					const response = await fetchInventoryList(); // Inspect response data
					setInventoryList(response.data || []);
				} catch (error) {
					setError(
						'Failed to fetch inventory list. Please try again later.'
					);
					console.error('Error fetching inventory list:', error);
					setInventoryList([]);
				} finally {
					setIsLoading(false);
				}
			}
		};
		fetchData();
	}, [id]);

	return (
		<>
			<InventoryList inventoryList={inventoryList} />

			{/* <button onClick={openModal}>Click me</button>

    {isModalOpen && (
				<div className='modal-overlay'>
					<DeleteModal
						deleteType='inventory item'
						deleteName='Placeholder Name'
						onDeleteSubmit={onDeleteSubmit}
						closeModal={closeModal}
					/>
				</div>
			)} */}
		</>
	);
}
