import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchInventoryList } from '../../utils/api.js';
import ItemRow from '../ItemRow/ItemRow.jsx';
import SearchBar from '../LowLevelComponents/SearchBar/SearchBar.jsx';
import CTAButton from '../LowLevelComponents/CTAButton/CTAButton.jsx';
import './InventoryList.scss';

function InventoryList({ id, className, inventoryList, onItemClick }) {
    const [inventoryData, setInventoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); //


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchInventoryList();
                setInventoryData(response.data); 
                setIsLoading(false); 
            } catch (error) {
                setError('Failed to load inventory data');
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleAddNewItem = () => {
        navigate('/inventory/add');
    };

    if (isLoading) {
        return <div>Loading inventory data...</div>;
    }


    if (error) {
        return <div>{error}</div>;
    }

    if (!Array.isArray(inventoryData) || inventoryData.length === 0) {
        return <div>No inventory items available.</div>;
    }


    console.log('InventoryList rendered with:', inventoryList);

    const showWarehouse = className !== 'hidden';

    const handleItemClick = (itemId) => {
        console.log('Item clicked in InventoryList:', itemId);
        onItemClick(itemId);
    };

    return (
        <div className={`inventory-list layout ${!showWarehouse ? 'no-shadow' : ''}`}>
            {showWarehouse && (
                <>
                    <h1 className="inventory-list__title">Inventory</h1>
                    <SearchBar className="inventory-list__search" />
                    <CTAButton
                                variant='primary'
                                text='+ Add New Item'
                                onClick={handleAddNewItem}
                            />
                    
                </>
            )}

            <table className="inventory-table">
                <thead>
                    <tr className="inventory-header h4-table-header">
                        <th>INVENTORY ITEM</th>
                        <th>CATEGORY</th>
                        <th>STATUS</th>
                        <th>QTY</th>
                        {showWarehouse && <th>WAREHOUSE</th>}
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryList.map((inventory) => (
                        <ItemRow
                            key={inventory.id}
                            item={inventory}
                            showWarehouse={showWarehouse}
                            onItemClick={() => handleItemClick(inventory.id)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryList;
