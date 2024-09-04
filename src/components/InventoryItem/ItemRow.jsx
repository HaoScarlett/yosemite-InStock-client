import React from 'react'
import './ItemRow.scss'

function ItemRow({ item }) {
  return (
    <div className='item__row'>
      <div className='item__content'>
        <div className="item__title">
          <a href={`/inventories/${item.id}`}>{item.item_name}</a>
        </div>
        <div className="item__details">
          <span className="item__category">{item.category}</span>
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
