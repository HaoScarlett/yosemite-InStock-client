import React from 'react'
import './ItemRow.scss'

function ItemRow({ item }) {
  return (
    <div className='item__row layout'>
      <div className='item__content'>
        <div className="item__title-wrapper">
          <a className="item__title" href={`/inventories/${item.id}`}>{item.item_name}</a>
          <span className="item__category">{item.category}</span>
        </div>
        <div className="item__details">
          <span className={`item__status ${item.status.toLowerCase()}`}>
            {item.status}
          </span>
          <span className="item__qty">{item.quantity}</span>
          <span className="item__warehouse">{item.warehouse_name}</span>
        </div>
      </div>
      <div className="item__actions">
        <button className="edit-btn">✏️</button>
        <button className="delete-btn">🗑️</button>
      </div>
    </div>
  )
}

export default ItemRow
