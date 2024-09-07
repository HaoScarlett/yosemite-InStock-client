import React, { useEffect, useState } from 'react';
import { fetchInventoryList } from '../../utils/api.js';
import ItemRow from '../ItemRow/ItemRow.jsx';
import SearchBar from '../LowLevelComponents/SearchBar/SearchBar.jsx';
import './InventoryList.scss';

function InventoryList({ id, className, inventoryList, onItemClick }) {
    // const [inventoryList, setInventoryList] = useState([]);

    // useEffect(() => {
    // const fetchData = async () => {
    //     try {
    //     const response = await fetchInventoryList();
    //     setInventoryList(response.data);
    //     console.log(response.data);
    //     } catch (error) {
    //     console.error(error);
    //     }
    // };
    // fetchData();
    // }, [id]);
    console.log('InventoryList rendered with:', inventoryList);

    if (!Array.isArray(inventoryList) || inventoryList.length === 0) {
        return <div>No inventory items available.</div>;
    }
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
