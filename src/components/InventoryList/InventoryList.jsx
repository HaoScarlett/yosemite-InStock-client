import React from 'react';
import { useState, useEffect } from 'react';
import './InventoryList.scss';
import { Link } from 'react-router-dom';

function InventoryList({ warehouseId }) {
    const [inventories, setInventories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/warehouses/${warehouseId}/inventories`);
                if (!response.ok) {
                    throw new Error('Failed to fetch inventories');
                }
                const data = await response.json();
                setInventories(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchInventories();
    }, [warehouseId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <ul>
                <li></li>
            </ul>
        </div>
    );
}

export default InventoryList;