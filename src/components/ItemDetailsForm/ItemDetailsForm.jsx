import React from 'react';
import './ItemDetailsForm.scss';

function ItemDetailsForm({ 
  itemName, 
  desc, 
  category, 
  setItemName, 
  setDesc, 
  setCategory 
}) {

  
  return (
    <div className="details">
      <h2 className="details__title h2-subheader">Item Details</h2>

      <label className="details__label h3-labels">Item Name</label>
      <input
        type="text"
        className="details__input p2-body-medium"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Item Name"
      />

      <label className="details__label">Description</label>
      <textarea
        className="details__textarea"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Enter a brief item description..."
      />

      <label className="details__label h3-labels">Category</label>
      <select
        className="details__select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Apparel">Apparel</option>
      </select>
    </div>
  );
}

export default ItemDetailsForm;
