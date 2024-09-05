import React, { useEffect, useState } from 'react'
import { fetchInventoryList } from '../../utils/api.js'
import ItemRow from '../ItemRow/ItemRow.jsx'
import './InventoryList.scss'
function InventoryList() {
    const [inventoryList, setInventoryList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchInventoryList();
                setInventoryList(response.data)
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className='inventory-list layout'>
            <h1 className='inventory-list__title'>Inventory</h1>
            <p>Search Bar</p>
            <p>button</p>
            <table className='inventory-table'>
                <thead>
                    <tr className='inventory-header h4-table-header'>
                        <th>INVENTORY ITEM</th>
                        <th>CATEGORY</th>
                        <th>STATUS</th>
                        <th>QTY</th>
                        <th>WAREHOUSE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryList.map(inventory => (
                        <ItemRow key={inventory.id} item={inventory} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default InventoryList
