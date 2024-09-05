import React from 'react';
import { Link } from 'react-router-dom'; 
import './Editbutton.scss';
import editbtn from '../../../assets/Icons/edit-white-24px.svg';

function Editbutton({ to }) { 
    return (
        <Link to={to} className="edit-button">
            <img className="edit-button__icon" src={editbtn} alt="edit icon" />
            <span className="edit-button__label">Edit</span>
        </Link>
    );
}

export default Editbutton;
