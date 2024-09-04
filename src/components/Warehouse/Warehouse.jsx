import React from 'react';
import './Warehouse.scss';
import { Link, NavLink } from 'react-router-dom';

//Warehouse Details component. This does not include the inventory list below the warehouse details. 
function Warehouse() {
    return ( <>
    <section className="warehouse">
        <div className="warehouse__header">
            <img className='warehouse__header__btn__back' src="" alt="back button" />
            <h1 className='warehouse__header__title'></h1>
            <img className='warehouse__header__btn__edit' src="" alt="round edit button" />
        </div>
        <div className="warehouse__details">
            <div className='warehouse__details__address'></div>
            <div className='warehouse__details__contact'>
                <div className='warehouse__details__contact__name'>

                </div>
                <div className='warehouse__details__contact__info'>
                    
                </div>
            </div>
        </div>
    </section>
    </> );
}

export default Warehouse;