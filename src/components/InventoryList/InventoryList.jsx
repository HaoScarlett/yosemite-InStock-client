import React, { useEffect, useState } from 'react'
import { fetchInventoryList } from '../../utils/api.js'

function InventoryList() {
    const [inventoryList, setInventoryList] = useState(null)

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
        <div>
            <h1>Inventory</h1>
            <p>Search Bar</p>
            <p>button</p>
            <p>{inventoryList}</p>
        </div>
    )
}

export default InventoryList
