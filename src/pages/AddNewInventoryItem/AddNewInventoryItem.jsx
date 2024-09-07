import React, { useState, useEffect } from 'react';
import './AddNewInventoryItem.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ItemDetailsForm from '../../components/ItemDetailsForm/ItemDetailsForm';
import ItemAvailabilityForm from '../../components/ItemAvailabilityForm/ItemAvailabilityForm';
import WarehouseForm from '../../components/WarehouseForm/WarehouseForm';  

function AddNewInventoryItem() {
  const api = import.meta.env.VITE_API_URL; 
  const navigate = useNavigate();

  const [itemName, setItemName] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('In Stock');
  const [quantity, setQuantity] = useState('');
  const [selectWarehouse, setSelectWarehouse] = useState('');
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    axios.get(`${api}/warehouses`)
      .then((response) => setWarehouses(response.data))
      .catch((error) => console.error('Error fetching warehouses:', error));
  }, [api]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!itemName || !category || (status === 'In Stock' && !quantity) || !selectWarehouse) {
      alert('Please fill out all required fields');
      return;
    }

    const newInventoryItem = {
      warehouse_id: selectWarehouse,
      item_name: itemName,
      description: desc,
      category: category,
      status: status,
      quantity: status === 'In Stock' ? quantity : 0,
    };

    try {
      await axios.post(`${api}/inventories`, newInventoryItem);
      alert('Item added successfully');
      navigate('/inventory');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <section className="add-inventory">
      <h1 className="add-inventory__title">Add New Inventory Item</h1>
      <form className="add-inventory__form" onSubmit={handleFormSubmit}>
        
        <ItemDetailsForm
          itemName={itemName}
          desc={desc}
          category={category}
          setItemName={setItemName}
          setDesc={setDesc}
          setCategory={setCategory}
        />

        <ItemAvailabilityForm
          status={status}
          quantity={quantity}
          setStatus={setStatus}
          setQuantity={setQuantity}
          warehouses={warehouses}
          selectWarehouse={selectWarehouse}
          setSelectWarehouse={setSelectWarehouse}
        />

        <div className="add-inventory__buttons">
          <button type="submit" className="add-inventory__button add">+ Add Item</button>
          <button type="button" className="add-inventory__button cancel" onClick={() => navigate('/inventory')}>Cancel</button>
        </div>
      </form>
    </section>
  );
}

export default AddNewInventoryItem;
