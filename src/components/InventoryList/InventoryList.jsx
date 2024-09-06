import React, { useEffect, useState } from 'react';
import { fetchInventoryList } from '../../utils/api.js';
import ItemRow from '../ItemRow/ItemRow.jsx';
import SearchBar from '../LowLevelComponents/SearchBar/SearchBar.jsx';
import CTAButton from '../LowLevelComponents/CTAButton/CTAButton.jsx';
import './InventoryList.scss';

function InventoryList({ id, className }) {
    const [inventoryList, setInventoryList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchInventoryList();
                setInventoryList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    const showWarehouse = className !== 'hidden';

    return (
        <div className={`inventory-list layout ${!showWarehouse ? 'no-shadow' : ''}`}>
            {showWarehouse && (
                <div className='inventory-list__header-wrapper'>
                    <h1 className="inventory-list__title">Inventory</h1>
                    <SearchBar className="inventory-list__search" />
                    <CTAButton text={'+ Add New Item'} />
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
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryList;
