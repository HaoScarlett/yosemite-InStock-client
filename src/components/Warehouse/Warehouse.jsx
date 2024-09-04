import React from 'react';
import { useState, useEffect } from 'react';
import './Warehouse.scss';
import { Link } from 'react-router-dom';
import backbtn from '../../assets/Icons/arrow_back-24px.svg';
import editbtn from '../../assets/Icons/edit-white-24px.svg';

//Warehouse Details component. This does not include the inventory list below the warehouse details. 
function Warehouse() {
    const [warehouse, setWarehouse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/warehouses/2')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setWarehouse(data); 
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching warehouse data:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!warehouse) {
        return null;
    }


    return ( <>
    <section className="warehouse">
                <div className="warehouse__header">
                    <Link to='/'>
                        <img className='warehouse__header__btn__back' src={backbtn} alt="back button" />
                    </Link>
                    <h1 className='warehouse__header__title'>{warehouse.warehouse_name}</h1>
                    <Link>
                        <img className='warehouse__header__btn__edit' src={editbtn} alt="round edit button" />
                    </Link>
                </div>
                <div className="warehouse__details">
                    <div className='warehouse__details__address'>
                        <p>{warehouse.address}</p>
                        <p>{warehouse.city}, {warehouse.country}</p>
                    </div>
                    <div className='warehouse__details__contact'>
                        <div className='warehouse__details__contact__name'>
                            <p>Contact Name: {warehouse.contact_name}</p>
                        </div>
                        <div className='warehouse__details__contact__info'>
                            <p>Position: {warehouse.contact_position}</p>
                            <p>Phone: {warehouse.contact_phone}</p>
                            <p>Email: {warehouse.contact_email}</p>
                        </div>
                    </div>
                </div>
            </section>
    </> );
}

export default Warehouse;