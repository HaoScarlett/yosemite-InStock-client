import React, { useState, useEffect } from 'react';
import './AddNewInventoryItem.scss';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg";
import { fetchWarehousesList, fetchInventoryCategory, postInventoryItem } from '../../utils/api';  
import ItemDetailsForm from '../../components/ItemDetailsForm/ItemDetailsForm';
import ItemAvailabilityForm from '../../components/ItemAvailabilityForm/ItemAvailabilityForm';
import CTAButton from '../../components/LowLevelComponents/CTAButton/CTAButton';

function AddNewInventoryItem() {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);  
  const [status, setStatus] = useState('In Stock');
  const [quantity, setQuantity] = useState('');
  const [selectWarehouse, setSelectWarehouse] = useState('');
  const [warehouses, setWarehouses] = useState([]);
  const [submit, setSubmit] = useState(false);

  // Error state
  const [itemNameError, setItemNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [selectWarehouseError, setSelectWarehouseError] = useState(false);

  useEffect(() => {
    fetchWarehousesList()
      .then((response) => setWarehouses(response.data))
      .catch((error) => console.error('Error fetching warehouses:', error));

    fetchInventoryCategory()
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);

    // Validation
    setItemNameError(!itemName);
    setDescError(!desc);
    setCategoryError(!category);
    setStatusError(!status);
    setQuantityError(!quantity && status === 'In Stock');
    setSelectWarehouseError(!selectWarehouse);

    if (!itemName || !category || (status === 'In Stock' && !quantity) || !selectWarehouse) {
      
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
      await postInventoryItem(newInventoryItem);  
      navigate('/inventory');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // handle status change
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  // handle quantity change
  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  // handle select warehouse change
  const handleChangeSelectWarehouse = (event) => {
    setSelectWarehouse(event.target.value);
  };

  return (
    <section className="add-inventory-container">
      <div className="add-inventory-heading">
      	<Link className="add-inventory-heading__link" to={".."} onClick={(e) => {
						e.preventDefault();
						navigate(-1);
					}}
				  >
					<img src={ArrowBack} alt="ArrowBackButton" />
				</Link>
        <h1 className="add-inventory-heading__title h1-page-header">Add New Inventory Item</h1>
      </div>

      <form className="add-inventory-form" onSubmit={handleFormSubmit}>

        <div className="add-inventory-form__component-container">
          <ItemDetailsForm
            itemName={itemName}
            desc={desc}
            category={category}
            setItemName={setItemName}
            setDesc={setDesc}
            setCategory={setCategory}
            categoryArray={categories} 
            submit={submit}
            itemNameError={itemNameError}
            descError={descError}
            categoryError={categoryError}
          />
        </div>

        <div className="add-inventory-form__component-container">
          <ItemAvailabilityForm
              warehouses={warehouses}
              handleChangeStatus={handleChangeStatus}
              status={status}
              handleChangeQuantity={handleChangeQuantity}
              quantity={quantity}
              handleChangeSelectWarehouse={handleChangeSelectWarehouse}
              selectWarehouse={selectWarehouse}
              statusError={statusError}
              quantityError={quantityError}
              selectWarehouseError={selectWarehouseError}
              submit={submit}
            />
        </div>

        <div className="add-inventory-form__button-wrapper">
          <div className="add-inventory-form__button-container">

            <CTAButton
              variant="secondary"
              onClick={() => navigate('/inventory')}
              text="Cancel"
            />

            <CTAButton
              variant="primary"
              type="submit"  
              text="+ Add Item"
            />

          </div>
        </div>
      </form>
    </section>
  );
}

export default AddNewInventoryItem;
