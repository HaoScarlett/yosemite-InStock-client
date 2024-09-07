import React from 'react';
import './ItemAvailabilityForm.scss';

function ItemAvailabilityForm({ status, quantity, setStatus, setQuantity }) {
  return (
    <div className="item-availability">
      <h2>Item Availability</h2>

      <label>Status</label>
      <div>
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
          <label>Quantity</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="0" />
        </>
      )}
    </div>
  );
}

export default ItemAvailabilityForm;
