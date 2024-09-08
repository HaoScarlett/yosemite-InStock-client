import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchInventoryItem, updateInventoryItem, fetchInventoryCategory, fetchWarehousesList } from '../../utils/api';
import { isInStock } from '../../utils/dataValidation.js'
import CTAButton from '../../components/LowLevelComponents/CTAButton/CTAButton.jsx'
import SectionHeader from '../../components/LowLevelComponents/SectionHeader/SectionHeader.jsx'
import InventoryItemErrorState from '../../components/InventoryItemErrorState/InventoryItemErrorState.jsx'
import './InventoryEditForm.scss'

export default function InventoryEditForm() {
    const [item, setItem] = useState({});
    const [categories, setCategories] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const loadItem = async () => {
            try {
                const [editItem, fetchedCategories, fetchedWarehouses] = await Promise.all([
                    fetchInventoryItem(id),
                    fetchInventoryCategory(),
                    fetchWarehousesList()
                ]);
                setItem({
                    ...editItem.data[0],
                    warehouse_id: editItem.data[0].warehouse_id || editItem.data[0].warehouse
                });
                setCategories(fetchedCategories.data);
                setWarehouses(fetchedWarehouses.data)
                // console.log('categories', fetchedCategories.data);
                // console.log('editItem', editItem.data[0]);
                // console.log('warehouses', fetchedWarehouses.data);
            } catch (err) {
                setGeneralError('Failed to load item data');
            } finally {
                setIsLoading(false);
            }
        };
        loadItem();
    }, [id]);

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = ['warehouse_id', 'item_name', 'description', 'category', 'status', 'quantity'];
        requiredFields.forEach(field => {
            if (!item[field] && item[field] !== 0) {
                newErrors[field] = 'This field is required.';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem(prevItem => ({
            ...prevItem,
            [name]: name === 'warehouse_id' || name === 'quantity' ? Number(value) : value
        }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        setGeneralError('');


        const itemToSubmit = {
            warehouse_id: Number(item.warehouse || item.warehouse_id),
            item_name: item.item_name,
            description: item.description,
            category: item.category,
            status: item.status,
            quantity: Number(item.quantity)
        };

        console.log('Submitting item data:', JSON.stringify(itemToSubmit, null, 2));

        try {
            await updateInventoryItem(id, itemToSubmit);
            navigate(`/inventory/${id}`);
        } catch (err) {
            console.error('Error response:', err.response?.data);
            if (err.response?.data?.errors) {
                setGeneralError(err.response.data.errors.join(', '));
            } else {
                setGeneralError('Failed to update item');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate(`/inventory/${id}`);
    };


    if (isLoading) return <div>Loading...</div>;
    if (!item) return <div>Item not found</div>;

    return (
        <div id='inventory-edit' className='item-form'>
            <SectionHeader text={'Edit Inventory Item'} url={`/inventory/${id}`} />
            {generalError && <div className="error-message">{generalError}</div>}
            <div className="divider"></div>
            <form action="" onSubmit={handleSubmit} className='layout'>
                <div className='item-form__details'>
                    <h2 className='h2-subheader'>Item Details</h2>
                    <label htmlFor="item_name">
                        <h3 className="item-name">Item Name</h3>
                        <input type="text"
                            name='item_name'
                            id='item_name'
                            value={item.item_name || ''}
                            placeholder={item.item_name}
                            onChange={handleChange}
                            required
                            maxLength={50}
                            min={0}
                        />
                        {errors.item_name && <InventoryItemErrorState />}
                    </label>
                    <label htmlFor="item-description">
                        <h3 className="item-description">Description</h3>
                        <textarea name="description" id="description" cols="30" rows="10"
                            value={item.description}
                            onChange={handleChange}
                            placeholder={item.description}
                            required
                            min={0}
                        ></textarea>
                        {errors.description && <InventoryItemErrorState />}
                    </label>
                    <label htmlFor="category">
                        <h3>Category</h3>
                        <select name="category" id="category"
                            className='item-form__dropdown'
                            value={item.category || ''}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                        {errors.category && <InventoryItemErrorState />}
                    </label>

                </div>
                <div className="divider"></div>
                <div className="item-form__availability">
                    <h2>Item Availability</h2>
                    <div className='item-form__status'>
                        <h3>Status</h3>
                        <div className='item-form__status-wrapper'>
                            <label htmlFor="status" className='item-form__radio-wrapper'><input type="radio"
                                name='status'
                                className='item-form__radio'
                                value={'In Stock'}
                                checked={isInStock(item.status)}
                                onChange={handleChange}
                            />In Stock</label>
                            <label htmlFor="status" className='item-form__radio-wrapper'><input type="radio"
                                name='status'
                                className='item-form__radio'
                                value={'Out of Stock'}
                                checked={isInStock(item.status)}
                                onChange={handleChange}
                            />Out of Stock</label>
                        </div>
                        {errors.status && <InventoryItemErrorState />}
                    </div>
                    {isInStock(item.status) && (
                        <label htmlFor="quantity">
                            <h3>Quantity</h3>
                            <input
                                type="number"
                                name="quantity"
                                id="quantity"
                                value={item.quantity || ''}
                                onChange={handleChange}
                                required
                                min="1"
                            />
                            {errors.quantity && <InventoryItemErrorState />}
                        </label>
                    )}
                    <label htmlFor="warehouse_id">
                        <h3>Warehouse</h3>
                        <select
                            name="warehouse_id"
                            id="warehouse_id"
                            className='item-form__dropdown'
                            value={item.warehouse_id || ''}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a warehouse</option>
                            {warehouses.map((warehouse) => (
                                <option key={warehouse.id} value={warehouse.id}>
                                    {warehouse.warehouse_name}
                                </option>
                            ))}
                        </select>
                        {errors.warehouse_id && <InventoryItemErrorState />}
                    </label>
                </div>
                <div className="button-wrapper">
                    <CTAButton text={'Cancel'} variant='secondary' onClick={handleCancel} type='button' />
                    <CTAButton text={isSubmitting ? 'Saving...' : 'Save'} type='submit' disabled={isSubmitting} />
                </div>

            </form></div>
    )
}
