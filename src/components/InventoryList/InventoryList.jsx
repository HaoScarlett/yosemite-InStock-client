import React, { useEffect, useState } from 'react';
import { fetchInventoryList } from '../../utils/api.js';
import ItemRow from '../ItemRow/ItemRow.jsx';
import SearchBar from '../LowLevelComponents/SearchBar/SearchBar.jsx';
import CTAButton from '../LowLevelComponents/CTAButton/CTAButton.jsx';
import './InventoryList.scss';

function InventoryList({ id, className, inventoryList, onItemClick }) {
    console.log('InventoryList rendered with:', inventoryList);

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
                            onItemClick={handleItemClick}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryList;
