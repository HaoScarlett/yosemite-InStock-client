import React from 'react';
import "./ItemAvailabilityForm.scss";
import InventoryItemErrorState from "../InventoryItemErrorState/InventoryItemErrorState";



function ItemAvailabilityForm({ 
	warehouses, 
	status, 
	quantity, 
	selectWarehouse, 
	handleChangeStatus, 
	handleChangeQuantity, 
	handleChangeSelectWarehouse,
	statusError,
	quantityError,
	selectWarehouseError,
	submit }) {

	return (
		<div className="avail">
			<h2 className="avail__title h2-subheader">Item Availability</h2>

			<label htmlFor="name" className="avail__label h3-labels">
				Status
			</label>
			<div className="avail__radio-container">

				<div className="avail__radio-set">
					<input
						className="avail__radio"
						type="radio"
						id="instock"
						name="status"
						value="In Stock"
						onChange={handleChangeStatus}
					/>

					<label className="avail__radio-label h3-labels" htmlFor="instock">
						In stock
					</label>
				</div>
				<div className="avail__radio-set h3-labels">
					<input
						className="avail__radio"
						type="radio"
						id="outofstock"
						name="status"
						value="Out of Stock"
						onChange={handleChangeStatus}
					/>
					<label
						className="avail__radio-label h3-labels"
						htmlFor="outofstock"
					>
						Out of stock
					</label>
					{submit === true && statusError === true && <InventoryItemErrorState />}
				</div>

				
			</div>
		<div className={status === "In Stock" ? "" : "out-of-stock"}>
			<label htmlFor="quantity" className="avail__label h3-labels">
				Quantity
			</label>
			<input
				type="text"
				className="avail__input"
				value={quantity}
				onChange={handleChangeQuantity}
				placeholder=""
				name="quantity"
			/>
		</div>
		{submit === true && quantityError === true && <InventoryItemErrorState />}

			<label htmlFor="" className="avail__label h3-labels">
				Warehouse
			</label>
			<div className="avail__select-wrap">
				<select
					className="avail__warehouse p2-body-medium"
					name="selectWarehouse"
					id="avail_warehouse"
					onChange={handleChangeSelectWarehouse}
					value={selectWarehouse}
				>
					<option value="" readOnly>
						Please select
					</option>
					{warehouses.map((warehouse) => (
						<option 
							key={warehouse.id} 
							value={warehouse.id}>
							{warehouse.warehouse_name}
						</option>
					))}
				</select>
			</div>
			{submit === true && selectWarehouseError === true && <InventoryItemErrorState />}
		</div>
	);
}

export default ItemAvailabilityForm;