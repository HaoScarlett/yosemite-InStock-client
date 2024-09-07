import React from 'react';
import './WarehouseItemRow.scss';
import { useMediaQuery } from 'react-responsive';
import chevronIcon from '../../assets/Icons/chevron_right-24px.svg';
import deleteIcon from '../../assets/Icons/delete_outline-24px.svg';
import editIcon from '../../assets/Icons/edit-24px.svg';

function WarehouseItemRow({ warehouse }) {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  // Mobile view component for Warehouse Item
  const MobileView = ({ warehouse }) => {
    return (
      <div className='warehouse-item-row'>
        <div className="warehouse-item">
          <div className='warehouse-item__name'>
            <span data-label="Warehouse">
              <a className='warehouse-item__name-link h3-links' href="#">{warehouse.warehouse_name}</a>
              <img className='warehouse-icon' src={chevronIcon} alt="Chevron Icon" />
            </span>
            <span data-label="Address">
              {warehouse.address}, {warehouse.city}, {warehouse.country}
            </span>
          </div>
          <div className='warehouse-item__details'>
            <span data-label="Contact Name">{warehouse.contact_name}</span>
            <span data-label="Contact Information" className="warehouse-item__contact-info">
              <span className="warehouse-item__contact-info--phone">{warehouse.contact_phone}</span>
              <span className="warehouse-item__contact-info--email">{warehouse.contact_email}</span>

            </span>
          </div>
        </div>
        <div className='warehouse-actions'>
          <span className='warehouse-actions__wrapper'>
            <button className="warehouse-delete-btn">
              <img src={deleteIcon} alt="Delete button" />
            </button>
            <button className="warehouse-edit-btn">
              <img src={editIcon} alt="Edit button" />
            </button>
          </span>
        </div>
      </div>
    );
  };

  // Desktop view component for Warehouse Item
  const DesktopView = ({ warehouse }) => {
    return (
      <>
        <tr className='warehouse-item-row'>
          <td className="warehouse-item__name">
            <a className='warehouse-item__name-link' href="#">{warehouse.warehouse_name}</a>
            <img className='warehouse-icon' src={chevronIcon} alt="Chevron Icon" />
          </td>
          <td className='warehouse-item__address'>
            {warehouse.address}, {warehouse.city}, {warehouse.country}
          </td>
          <td className='warehouse-item__contact-name'>{warehouse.contact_name}</td>
          <td className='warehouse-item__contact-info'>
            {/* <span>{warehouse.contact_phone}</span>
            <span>{warehouse.contact_email}</span> */}
            <span className="warehouse-item__contact-info--phone">{warehouse.contact_phone}</span>
            <span className="warehouse-item__contact-info--email">{warehouse.contact_email}</span>

          </td>
          <td className='warehouse-actions'>
            <button className="warehouse-delete-btn">
              <img src={deleteIcon} alt="Delete button" />
            </button>
            <button className="warehouse-edit-btn">
              <img src={editIcon} alt="Edit button" />
            </button>
          </td>
        </tr>
      </>
    );
  };

  // Render based on screen size
  return (
    <>
      {isDesktop ? <DesktopView warehouse={warehouse} /> 
      : 
      <MobileView warehouse={warehouse} />}
    </>
  );
}

export default WarehouseItemRow;
