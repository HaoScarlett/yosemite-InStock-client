import React from 'react'
import './ItemRow.scss'
import chevronIcon from '../../assets/Icons/chevron_right-24px.svg'

function ItemRow({ item }) {
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

export default ItemRow
