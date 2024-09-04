import React from 'react';
import './Warehouse.scss';
import { Link, NavLink } from 'react-router-dom';
import backbtn from '../../assets/Icons/arrow_back-24px.svg';
import editbtn from '../../assets/Icons/edit-24px.svg';

//Warehouse Details component. This does not include the inventory list below the warehouse details. 
function Warehouse() {
    return ( <>
    <section className="warehouse">
        <div className="warehouse__header">
            <Link to='/'>
                <img className='warehouse__header__btn__back' src={backbtn} alt="back button" />
            </Link>
            <h1 className='warehouse__header__title'></h1>
            <Link>
                <img className='warehouse__header__btn__edit' src={editbtn} alt="round edit button" />
            </Link>
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