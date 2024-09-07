import React, { useState, useEffect } from 'react';
import './AddNewInventoryItem.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ItemDetailsForm from '../../components/ItemDetailsForm/ItemDetailsForm';
import ItemAvailabilityForm from '../../components/ItemAvailabilityForm/ItemAvailabilityForm';

function AddNewInventoryItem() {
  const api = import.meta.env.VITE_API_URL; 
  const navigate = useNavigate();

  const [itemName, setItemName] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);  // State to hold categories
  const [status, setStatus] = useState('In Stock');
  const [quantity, setQuantity] = useState('');
  const [selectWarehouse, setSelectWarehouse] = useState('');
  const [warehouses, setWarehouses] = useState([]);
  const [submit, setSubmit] = useState(false);

  // Error state
  const [itemNameError, setItemNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  useEffect(() => {
    axios.get(`${api}/warehouses`)
      .then((response) => setWarehouses(response.data))
      .catch((error) => console.error('Error fetching warehouses:', error));

    axios.get(`${api}/categories`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, [api]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);

    // Validation
    setItemNameError(!itemName);
    setDescError(!desc);
    setCategoryError(!category);

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
      <h1 className="add-inventory__title h1-page-header">Add New Inventory Item</h1>
      <form className="add-inventory__form" onSubmit={handleFormSubmit}>
        
        <ItemDetailsForm
          itemName={itemName}
          desc={desc}
          category={category}
          setItemName={setItemName}
          setDesc={setDesc}
          setCategory={setCategory}
          categoryArray={categories} // Pass categories to ItemDetailsForm
          submit={submit}
          itemNameError={itemNameError}
          descError={descError}
          categoryError={categoryError}
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
