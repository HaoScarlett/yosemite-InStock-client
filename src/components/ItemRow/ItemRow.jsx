import React from 'react'
import './ItemRow.scss'
import chevronIcon from '../../assets/Icons/chevron_right-24px.svg'
import { useMediaQuery } from 'react-responsive';

function ItemRow({ item }) {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  const MobileView = ({ item }) => {
    return (
      <div className='item-row'>
        <div className="inventory-item">
          <div className='inventory-item__name'>
            <span data-label="Inventory Item"><a className='item-name' href="">{item.item_name}
            </a>
              <img className='icon' src={chevronIcon} alt="" />
            </span>
            <span data-label="Category">{item.category}</span>
          </div>
          <div className='inventory-item__details'>
            <span data-label="Status" className={`status ${item.status.toLowerCase().replace(' ', '-')}`}>
              {item.status}
            </span>
            <span data-label="QTY">{item.quantity}</span>
            <span data-label="Warehouse">{item.warehouse_name}</span>
          </div></div>
        <div className='actions'>
          <span data-label="Actions">
            <button className="delete-btn">❌</button>
            <button className="edit-btn">📝</button>
          </span>
        </div>
      </div>
    )
  }

  const DesktopView = ({ item }) => (
    <div className='item-row desktop'>
      <div className="inventory-item">
        <div className='inventory-item__name'>
          <a className='item-name' href="#">{item.item_name}</a>
          <img className='icon' src={chevronIcon} alt="chevron icon" />
        </div>
        <div className='inventory-item__category'>{item.category}</div>
        <div className={`inventory-item__status status ${item.status.toLowerCase().replace(' ', '-')}`}>
          {item.status}
        </div>
        <div className='inventory-item__quantity'>{item.quantity}</div>
        <div className='inventory-item__warehouse'>{item.warehouse_name}</div>
      </div>
      <div className='actions'>
        <button className="delete-btn">❌</button>
        <button className="edit-btn">📝</button>
      </div>
    </div>
  );

  return (
    <>
      {isDesktop ? <DesktopView item={item} /> : <MobileView item={item} />}
    </>
  );

}

export default ItemRow
