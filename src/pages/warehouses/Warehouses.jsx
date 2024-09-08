import React, { useState, useEffect } from 'react';
import "./Warehouses.scss";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import deleteicon from "../../assets/Icons/delete_outline-24px.svg";
import editicon from "../../assets/Icons/edit-24px.svg";
import rightArrow from "../../assets/Icons/chevron_right-24px.svg";
import sorticon from "../../assets/Icons/sort-24px.svg";
import SearchBar from "../../components/LowLevelComponents/SearchBar/SearchBar";
import CTAButton from '../../components/LowLevelComponents/CTAButton/CTAButton';
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { fetchWarehousesList } from '../../utils/api';

export const api = import.meta.env.VITE_API_URL;

function Warehouses() {
  const { warehouseId } = useParams();
  const [warehouses, setWarehouses] = useState([]);
  const [deleteModalInfo, setDeleteModalInfo] = useState({});

  // useEffect hook to fetch warehouses when component mounts
  useEffect(() => {
    getWarehouses();
  }, []);

  // Function to fetch the list of warehouses
  function getWarehouses() {
    fetchWarehousesList()
      .then((response) => {
        console.log(response.data);
        setWarehouses(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  // Function to delete a warehouse
  function deleteWarehouse(id) {
    axios
      .delete(`${api}/warehouses/${id}`)
      .then((response) => {
        getWarehouses();
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Handle delete button click
  function deleteButtonClick(warehouse) {
    const info = {
      id: warehouse.id,
      title: `Delete ${warehouse.warehouse_name} warehouse?`,
      text: `Please confirm that you’d like to delete ${warehouse.warehouse_name} from the list of warehouses. You won’t be able to undo this action.`,
    };

    setDeleteModalInfo(info);
  }

  // Handle cancel on delete modal
  function onDeleteModalCancel() {
    setDeleteModalInfo({});
  }

  // Handle confirm on delete modal
  function onDeleteModalConfirm(id) {
    deleteWarehouse(id);
    setDeleteModalInfo({});
  }

  // Render the warehouse list
  return (
    <section className="warehouses">
      <DeleteModal
        deleteModalInfo={deleteModalInfo}
        onCancel={onDeleteModalCancel}
        onConfirm={onDeleteModalConfirm}
      />

      <div className="warehouses__box">
          <h1 className="warehouses__title h1-page-header">Warehouses</h1>
          <div className="warehouses__container">
            <SearchBar />
            <Link to={"/warehouses/add"}>
              <CTAButton text={'+ Add New Warehouse'} variant="primary" />
            </Link>
          </div>
      </div>

      <div className="warehouses__list--tablet">
        <p className="warehouses__tablet h4-table-header">
          warehouse{" "}
          <img className="warehouses__sort" src={sorticon} alt="sort icon" />
        </p>
        <p className="warehouses__tablet h4-table-header">
          address{" "}
          <img className="warehouses__sort" src={sorticon} alt="sort icon" />
        </p>
        <p className="warehouses__tablet h4-table-header">
          contact name{" "}
          <img className="warehouses__sort" src={sorticon} alt="sort icon" />
        </p>
        <p className="warehouses__tablet h4-table-header">
          contact information
          <img className="warehouses__sort" src={sorticon} alt="sort icon" />
        </p>
        <p className="warehouses__tablet h4-table-header">actions</p>
      </div>

      {warehouses.map((warehouse) => (
        <ul className="warehouses__list" key={warehouse.id}>
          <li className="warehouses__items">
            <div className="warehouses__container">
              <div className="warehouses__item">
                <h4 className="warehouses__subtitle h4-table-header">warehouse</h4>
                <div className="warehouses__info p2-body-medium">
                  <Link className="warehouses__link" to={`/warehouses/${warehouse.id}`}>
                    {warehouse.warehouse_name}
                    <img className="warehouses__icon" src={rightArrow} alt="arrow-right" />
                  </Link>
                </div>
              </div>

              <div className="warehouses__item">
                <h4 className="warehouses__subtitle h4-table-header">address</h4>
                <div className="warehouses__info p2-body-medium">
                  <p>{warehouse.address + ", "}</p>
                  <p>{warehouse.city + ", " + warehouse.country}</p>
                </div>
              </div>

              <div className="warehouses__item">
                <h4 className="warehouses__subtitle h4-table-header">contact name</h4>
                <div className="warehouses__info p2-body-medium">
                  {warehouse.contact_name}
                </div>
              </div>

              <div className="warehouses__item">
                <h4 className="warehouses__subtitle h4-table-header">contact information</h4>
                <div className="warehouses__info p2-body-medium">
                  {warehouse.contact_phone}
                </div>
                <div className="warehouses__info p2-body-medium">
                  {warehouse.contact_email}
                </div>
              </div>

              <div className="warehouses__item warehouses__item--last">
                <div className="warehouses__delete">
                  <img
                    src={deleteicon}
                    alt="delete-icon"
                    onClick={() => deleteButtonClick(warehouse)}
                  />
                </div>

                <Link to={`/warehouses/edit/${warehouse.id}`}>
                  <div className="warehouses__edit">
                    <img src={editicon} alt="edit-icon" />
                  </div>
                </Link>
              </div>
            </div>
          </li>
        </ul>
      ))}
    </section>
  );
}

export default Warehouses;
