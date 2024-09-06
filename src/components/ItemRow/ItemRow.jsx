import React from 'react'
import './ItemRow.scss'
import chevronIcon from '../../assets/Icons/chevron_right-24px.svg'
import { useMediaQuery } from 'react-responsive';
import deleteIcon from '../../assets/Icons/delete_outline-24px.svg'
import editIcon from '../../assets/Icons/edit-24px.svg'
import InOutStock from '../LowLevelComponents/InOutStock/InOutStock.jsx'

function ItemRow({ item }) {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  const MobileView = ({ item }) => {
    const inStock = item.status === 'In Stock' ? true : false;
    return (
      <div className='item-row'>
        <div className="inventory-item">
          <div className='inventory-item__name'>
            <span data-label="Inventory Item"><a className='item-name h3-links' href="">{item.item_name}
            </a>
              <img className='icon' src={chevronIcon} alt="" />
            </span>
            <span data-label="Category">{item.category}</span>
          </div>
          <div className='inventory-item__details'>
            <span data-label="Status" className='status'>
              <InOutStock inStock={inStock} />
            </span>
            <span data-label="QTY">{item.quantity}</span>
            <span data-label="Warehouse">{item.warehouse_name}</span>
          </div></div>
        <div className='actions'>
          <span data-label="Actions" className='actions__wrapper'>
            <button className="delete-btn">
              <img src={deleteIcon} alt="delete button" />
            </button>
            <button className="edit-btn">
              <img src={editIcon} alt="edit button" />
            </button>
          </span>
        </div>
      </div>
    )
  }

  const DesktopView = ({ item }) => {
    return (
      <>
        <tr className='item-row'>
          <td className="inventory-item__name">
            <a className='item-name' href="#">{item.item_name}</a>
            <img className='icon' src={chevronIcon} alt="chevron icon" />
          </td>
          <td className='inventory-item__category'>{item.category}</td>
          <td className='inventory-item__status status'>
            <InOutStock inStock={inStock} />
          </td>
          <td className='inventory-item__quantity'>{item.quantity}</td>
          <td className='inventory-item__warehouse'>{item.warehouse_name}</td>
          <td className='actions'>
            <button className="delete-btn">
              <img src={deleteIcon} alt="delete button" />
            </button>
            <button className="edit-btn">
              <img src={editIcon} alt="edit button" />
            </button>
          </td>
        </tr>
      </>
    );
  }

  return (
    <>
      {isDesktop ? <DesktopView item={item} /> : <MobileView item={item} />}
    </>
  );

}

export default ItemRow
