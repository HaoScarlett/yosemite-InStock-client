import React from 'react';
import { useState,useEffect } from 'react';
import SectionHeader from '../../components/LowLevelComponents/SectionHeader/SectionHeader';
import WarehouseForm from '../../components/WarehouseForm/WarehouseForm';
import { postWarehouse } from '../../utils/api';
import { updateWarehouse } from '../../utils/api';
import { fetchSingleWarehouse } from '../../utils/api';

function EditWarehouse() {

        const [initialData, setInitialData] = useState(null);
        const warehouseId = 1;  
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetchSingleWarehouse(warehouseId); 
                    setInitialData(response.data);
                } catch (error) {
                    console.error("Error fetching warehouse data:", error);
                }
            };
    
            if (warehouseId) {
                fetchData();
            }
        }, [warehouseId]);
    
        const onSubmit = async (formData) => {
            try {
                if (warehouseId) {
                    await updateWarehouse(warehouseId, formData); 
                } else {
                    await postWarehouse(formData);
                }
            }  catch (error) {
                console.error("Error saving warehouse:", error);
                if (error.response?.data?.errors) {
                    throw error;  
                } else {
                    alert("An unknown error occurred.");
                }
            }
        };
    

	return (
		<main>
			<div className='new-warehouse__header'>
				<SectionHeader
					text='Edit New Warehouse'
					url='/'
				/>
			</div>
			<WarehouseForm
				onSubmitFunction={onSubmit}
                initialData={initialData}
			/>
		</main>
	);
}


export default EditWarehouse;
