import React from 'react';
import './ItemDetailsForm.scss';
import InventoryItemErrorState from '../InventoryItemErrorState/InventoryItemErrorState';

function ItemDetailsForm({
	categoryArray, 
	itemName, 
	desc, 
	category, 
	setItemName, 
	setDesc, 
	setCategory, 
	itemNameError,
	descError,
	categoryError, 
	submit
}) {
  return (
    <div className="details">
      <h2 className="details__title h2-subheader">Item Details</h2>

      <label htmlFor="name" className="details__label h3-labels">
        Item Name
      </label>
      <input
        type="text"
        className="details__input p2-body-medium"
        name="itemName"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}  
        placeholder="Item Name"
      />
      {submit === true && itemNameError === true && <InventoryItemErrorState />}

      <label htmlFor="desc" className="details__label h3-labels">
        Description
      </label>
      <textarea
        className="details__desc-input p2-body-medium"
        name="desc"
        value={desc}
        onChange={(e) => setDesc(e.target.value)} 
        placeholder="Please enter a brief item description..."
      />
      {submit === true && descError === true && <InventoryItemErrorState />}

      <label htmlFor="category" className="details__label h3-labels">
        Category
      </label>
      <div className="details__select-wrap">
        <select
          className="details__select p2-body-medium"
          name="category"
          id="details_select"
          onChange={(e) => setCategory(e.target.value)} 
          value={category}
        >
          <option className="details__placeholder p2-body-medium" value="">
            Please select
          </option>
          {categoryArray.map((inventory) => (
            <option key={inventory} value={inventory}>
              {inventory}
            </option>
          ))}
        </select>
      </div>
      {submit === true && categoryError === true && <InventoryItemErrorState />}
    </div>
  );
}

export default ItemDetailsForm;
