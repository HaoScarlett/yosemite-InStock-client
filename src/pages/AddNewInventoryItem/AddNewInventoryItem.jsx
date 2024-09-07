import React, { useState } from 'react';
import './AddNewInventoryItem.scss';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import ItemDetailsForm from './ItemDetailsForm';
import ItemAvailabilityForm from './ItemAvailabilityForm';
import WarehouseForm from '../../components/WarehouseForm/WarehouseForm';  // 保留的 WarehouseForm 组件

function AddNewInventoryItem() {
  const api = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [itemName, setItemName] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('In Stock');
  const [quantity, setQuantity] = useState('');
  const [selectWarehouse, setSelectWarehouse] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!itemName || !category || (status === 'In Stock' && !quantity) || !selectWarehouse) {
      alert('Please fill out all required fields');
      return;
    }

    const newInventoryItem = {
      id: uuidv4(),
      warehouse_id: selectWarehouse,
      item_name: itemName,
      description: desc,
      category: category,
      status: status,
      quantity: quantity || 0,
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
    <section className="container">
      <h1>Add New Inventory Item</h1>
      <form onSubmit={handleFormSubmit}>
        {/* 使用自己创建的 ItemDetailsForm 处理物品基础信息 */}
        <ItemDetailsForm
          itemName={itemName}
          desc={desc}
          category={category}
          setItemName={setItemName}
          setDesc={setDesc}
          setCategory={setCategory}
        />
        
        {/* 使用自己创建的 ItemAvailabilityForm 处理库存信息 */}
        <ItemAvailabilityForm
          status={status}
          quantity={quantity}
          setStatus={setStatus}
          setQuantity={setQuantity}
        />
        
        {/* 使用团队的 WarehouseForm 处理仓库选择 */}
        <WarehouseForm
          onChange={(e) => setSelectWarehouse(e.target.value)}
        />

        <button type="submit">+ Add Item</button>
      </form>
    </section>
  );
}

export default AddNewInventoryItem;
