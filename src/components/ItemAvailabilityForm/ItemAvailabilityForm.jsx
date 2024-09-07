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
      <h2 className="availability__title">Item Availability</h2>

      <label className="availability__label">Status</label>
      <div className="availability__radio-group">
        <input
          type="radio"
          value="In Stock"
          checked={status === 'In Stock'}
          onChange={() => setStatus('In Stock')}
        />
        <label>In Stock</label>

        <input
          type="radio"
          value="Out of Stock"
          checked={status === 'Out of Stock'}
          onChange={() => setStatus('Out of Stock')}
        />
        <label>Out of Stock</label>
      </div>

      {status === 'In Stock' && (
        <>
          <label className="availability__label">Quantity</label>
          <input
            type="number"
            className="availability__input"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0"
          />
        </>
      )}

      <label className="availability__label">Warehouse</label>
      <select
        className="availability__select"
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
