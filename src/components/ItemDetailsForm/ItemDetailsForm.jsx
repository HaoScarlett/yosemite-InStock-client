import React from 'react';
import './ItemDetailsForm.scss';

function ItemDetailsForm({ itemName, desc, category, setItemName, setDesc, setCategory }) {
  return (
    <div className="item-details">
      <h2>Item Details</h2>

      <label>Item Name</label>
      <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Item Name" />

      <label>Description</label>
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />

      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Apparel">Apparel</option>
      </select>
    </div>
  );
}

export default ItemDetailsForm;
