import React, { useEffect, useState } from 'react';
import { fetchInventoryList } from '../../utils/api.js';
import ItemRow from '../ItemRow/ItemRow.jsx';
import SearchBar from '../LowLevelComponents/SearchBar/SearchBar.jsx';
import CTAButton from '../LowLevelComponents/CTAButton/CTAButton.jsx';
import './InventoryList.scss';

function InventoryList({ id, className, inventoryList, onItemClick, warehouseId }) {
    console.log('InventoryList rendered with:', inventoryList);
    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('InventoryList useEffect triggered. warehouseId:', warehouseId);
        if (!warehouseId) {
            console.error('No warehouseId provided to InventoryList');
            setError('No warehouse ID provided');
            setLoading(false);
            return;
        }

        const fetchInventory = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/warehouses/${warehouseId}/inventories`);

                if (!response.ok) {
                    throw new Error('Failed to fetch inventory data');
                }

                const data = await response.json();
                console.log('Inventory data fetched:', data);
                setInventoryItems(data);
            } catch (error) {
                console.error('Error fetching inventory:', error);
                setError('Failed to load inventory. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, [warehouseId]);

    if (!Array.isArray(inventoryList) || inventoryList.length === 0) {
        return <div>No inventory items available.</div>;
    }
    const showWarehouse = className !== 'hidden';

    const handleItemClick = (itemId) => {
        console.log('Item clicked in InventoryList:', itemId);
        onItemClick(itemId);
    };

    const handleAddNewItem = () => {
        navigate('/inventory/add');
    }

    return (
        <div className={`inventory-list layout ${!showWarehouse ? 'no-shadow' : ''}`}>
            {showWarehouse && (
                <div className='inventory-list__mobile-wrapper'>
                    <h1 className="inventory-list__title">Inventory</h1>
                    <SearchBar className="inventory-list__search" />
                    <CTAButton
                        text="+ Add New Item"
                        onClick={handleAddNewItem}
                        variant="primary"
                    />
                </div>
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

export default React.memo(InventoryList);
