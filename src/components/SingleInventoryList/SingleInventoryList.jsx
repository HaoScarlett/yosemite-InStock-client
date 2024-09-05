import React, { useState, useEffect } from 'react';
import './InventoryList.scss';
import { Link } from 'react-router-dom';
import deleteBtn from '../../assets/Icons/delete_outline-24px.svg';
import editBtn from '../../assets/Icons/edit-24px.svg';
import enterIcon from '../../assets/Icons/chevron_right-24px.svg'

function SingleInventoryList({ warehouseId }) {
    const [inventories, setInventories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/warehouses/1/inventories`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch inventories');
                }
                return response.json();
            })
            .then((data) => {
                setInventories(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching inventories data:', error);
                setError(error);
                setLoading(false);
            });
    }, [warehouseId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <ul>
                {inventories.map((inventory) => (
                    <li key={inventory.id}>
                        <span>{inventory.item_name} <img src={enterIcon} alt="enter icon" /></span> {inventory.category} {inventory.status} {inventory.quantity}
                        <img src={deleteBtn} alt="Delete icon" />
                        <img src={editBtn} alt="Edit icon" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SingleInventoryList;
