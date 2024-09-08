import React from 'react';
import "./DeleteModal.scss";
import Modal from "react-modal";
import closeIcon from "../../assets/Icons/close-24px.svg";
import CTAButton from "../LowLevelComponents/CTAButton/CTAButton";

export default function DeleteModal({ 
    deleteModalInfo, 
    onCancel, 
    onConfirm }) {

    // Modal is open if deleteModalInfo contains data
    const modalIsOpen = Object.keys(deleteModalInfo).length > 0;

    return (
        <Modal
            className="delete-modal"
            overlayClassName="delete-modal__overlay"
            ariaHideApp={false}
            isOpen={modalIsOpen}
            onRequestClose={onCancel}
        >
            <button className="delete-modal__close-btn" onClick={onCancel}>
                <img src={closeIcon} alt="close-icon" />
            </button>

            <h1 className="delete-modal__title h1-page-header">
                {deleteModalInfo.title}
            </h1>
            <p className="delete-modal__text p1-body-large">
                {deleteModalInfo.text}
            </p>

            <div className="delete-modal__btn">
                <CTAButton 
                    text={'Cancel'} 
                    variant='secondary' 
                    onClick={onCancel} 
                />

                <CTAButton 
                    text={'Delete'} 
                    variant='delete' 
                    onClick={() => onConfirm(deleteModalInfo.id)}  // Replace handleDelete with onConfirm
                />
            </div>
        </Modal>
    );
}
