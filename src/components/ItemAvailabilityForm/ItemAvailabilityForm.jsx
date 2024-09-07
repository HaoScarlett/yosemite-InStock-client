import React from 'react';
import './ItemAvailabilityForm.scss';

function ItemAvailabilityForm({ 
  status, 
  quantity, 
  setStatus, 
  setQuantity, 
  warehouses, 
  selectWarehouse, 
  setSelectWarehouse 
}) {

  
  return (
    <div className="availability">
      <h2 className="availability__title h2-subheader">Item Availability</h2>

      <label className="availability__label h3-labels">Status</label>
      <div className="availability__radio-group">
        <input
          type="radio"
          value="In Stock"
          checked={status === 'In Stock'}
          onChange={() => setStatus('In Stock')}
        />
        <label className='p2-body-medium'>In Stock</label>

        <input
          type="radio"
          value="Out of Stock"
          checked={status === 'Out of Stock'}
          onChange={() => setStatus('Out of Stock')}
        />
        <label className='p2-body-medium'>Out of Stock</label>
      </div>

      {status === 'In Stock' && (
        <>
          <label className="availability__label h3-labels">Quantity</label>
          <input
            type="number"
            className="availability__input className='p2-body-medium'"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0"
          />
        </>
      )}

      <label className="availability__label h3-labels">Warehouse</label>
      <select
        className="availability__select p2-body-medium"
        value={selectWarehouse}
        onChange={(e) => setSelectWarehouse(e.target.value)}
      >
        <option value="">Select Warehouse</option>
        {warehouses.map((warehouse) => (
          <option key={warehouse.id} value={warehouse.id}>
            {warehouse.warehouse_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ItemAvailabilityForm;
