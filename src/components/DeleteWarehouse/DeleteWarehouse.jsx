import React from 'react'
import "./DeleteWarehouse.scss";
import Modal from "react-modal";
import closeIcon from "../../assets/Icons/close-24px.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";




export default function DeleteWarehouse({ 
    deleteModalInfo, 
    onCancel, 
    onConfirm }) {

        const modalIsOpen = Object.keys(deleteModalInfo).length > 0;
        const navigate = useNavigate();

        const handleDelete = () => {
            axios
              .delete(`${process.env.VITE_API_URL}/warehouses/${deleteModalInfo.id}`)
              .then(() => {
                onConfirm(); 
                navigate("/"); 
              })
              .catch((err) => {
                console.log(err);
              });
          };

  return (

    <Modal
    className="delete-modal"
    overlayClassName="delete-modal__overlay"
    ariaHideApp={false}
    isOpen={modalIsOpen}
    onRequestClose={onCancel}
  >
    <button className="delete-modal__close-btn" onClick={onCancel}>
      <img src={closeIcon} alt="close icon" />
    </button>

    <h1 className="delete-modal__title">Delete {deleteModalInfo.name} warehouse?</h1>
    <p className="delete-modal__text">
      Please confirm that you’d like to delete the {deleteModalInfo.name} from the list of warehouses. You won’t be able to undo this action.
    </p>

    <div className="delete-modal__btns">
      <button className="delete-modal__btn" onClick={onCancel}>
        Cancel
      </button>
      <button
        className="delete-modal__btn delete-modal__btn--delete"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  </Modal>

  )
}
