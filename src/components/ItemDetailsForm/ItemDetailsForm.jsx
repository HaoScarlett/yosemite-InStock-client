import React from 'react';
import './ItemDetailsForm.scss';
import InventoryItemErrorState from '../InventoryItemErrorState/InventoryItemErrorState';

function ItemDetailsForm({
  categoryArray,  // Receive category array
  itemName,
  desc,
  category,
  setItemName,
  setDesc,
  setCategory,
  submit,
  itemNameError,
  descError,
  categoryError
}) {
  
  return (
    <div className="details">
      <h2 className="details__title h2-subheader">Item Details</h2>

      <label htmlFor="name" className="details__label h3-labels">
        Item Name
      </label>
      <input
        type="text"
        className={`details__input p2-body-medium ${submit && itemNameError ? 'error' : ''}`}
        name="itemName"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        placeholder="Item Name"
      />
      {submit && itemNameError && <InventoryItemErrorState />}

      <label htmlFor="desc" className="details__label h3-labels">
        Description
      </label>
      <textarea
        type="text"
        className={`details__desc-input p2-body-medium ${submit && descError ? 'error' : ''}`}
        name="desc"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Enter a brief item description..."
      />
      {submit && descError && <InventoryItemErrorState />}

      <label htmlFor="category" className="details__label h3-labels">
        Category
      </label>
      <select
        className={`details__select p2-body-medium ${submit && categoryError ? 'error' : ''}`}
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="" disabled>
          Select Category
        </option>
        {categoryArray.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {submit && categoryError && <InventoryItemErrorState />}
    </div>
  );
}

export default ItemDetailsForm;
