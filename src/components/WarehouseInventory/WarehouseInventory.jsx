import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dotenv from 'dotenv';
import InventoryList from '../InventoryList/InventoryList';
import './WarehouseInventory.scss';
import { Link } from 'react-router-dom';
import backbtn from '../../assets/Icons/arrow_back-24px.svg';
import Editbutton from '../LowLevelComponents/Editbutton/Editbutton';

//Warehouse Details component. This does not include the inventory list below the warehouse details. 
function WarehouseInventory() {
    const [warehouse, setWarehouse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    console.log('WarehouseInventory rendered. ID from useParams:', id);

    useEffect(() => {
        console.log('WarehouseInventory useEffect triggered. ID:', id);
        if (!id) {
            setError('No warehouse ID provided');
            setLoading(false);
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/warehouses/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Warehouse data fetched:', data);
                setWarehouse(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching warehouse data:', error);
                setError(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!warehouse) {
        return null;
    }

    console.log('WarehouseInventory rendering. ID:', id);
    return (<>
        <section className="warehouse">
            <div className="warehouse__header">
                <Link to='/'>
                    <img className='warehouse__header-btn--back' src={backbtn} alt="back button" />
                </Link>
                <h1 className='warehouse__header-title .h1-page-header'>{warehouse.warehouse_name}</h1>
                <div className='warehouse__header-btn--edit'><Editbutton /></div>
            </div>
            <div className="warehouse__details">
                <div className='warehouse__details-address'>
                    <span className='h4-table-header '>WAREHOUSE ADDRESS:</span>
                    <div className='warehouse__details-address-container'>
                        <p className='p3-body-small'>{warehouse.address},</p>
                        <p className='p3-body-small'>{warehouse.city},{warehouse.country}</p>
                    </div>
                </div>
                <div className='warehouse__details-contact'>
                    <div className='warehouse__details-contact-name'>
                        <span className='h4-table-header'>CONTACT NAME:</span>
                        <p className='p3-body-small'>{warehouse.contact_name}</p>
                        <p className='p3-body-small'>{warehouse.contact_position}</p>
                    </div>
                    <div className='warehouse__details-contact-info'>
                        <span className='h4-table-header '>CONTACT INFORMATION:</span>
                        <p className='p3-body-small'>{warehouse.contact_phone}</p>
                        <p className='p3-body-small'>{warehouse.contact_email}</p>
                    </div>
                </div>
            </div>
            <div className='warehouse__list'>{id && <InventoryList key={id} warehouseId={id} />}</div>
        </section>

    </>);
}

export default WarehouseInventory;