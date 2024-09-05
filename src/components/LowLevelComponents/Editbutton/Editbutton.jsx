import React from 'react';
import './Editbutton.scss';
import editbtn from '../../../assets/Icons/edit-white-24px.svg';

function Editbutton (){
    return (
        <button className="edit-button">
            <img className="edit-button__icon" src={editbtn} alt="edit icon" />
            <span className="edit-button__label ">Edit</span>
        </button>
    );
}

export default Editbutton;
