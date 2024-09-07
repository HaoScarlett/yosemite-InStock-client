import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchInventoryItem, updateInventoryItem, fetchInventoryCategory, fetchWarehousesList } from '../../utils/api';
import { isInStock } from '../../utils/dataValidation.js'
import CTAButton from '../../components/LowLevelComponents/CTAButton/CTAButton.jsx'
import SectionHeader from '../../components/LowLevelComponents/SectionHeader/SectionHeader.jsx'

export default function InventoryEditForm() {
    const [item, setItem] = useState({});
    const [categories, setCategories] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const loadItem = async () => {
            try {
                // const editItem = await fetchInventoryItem(id);
                // const fetchedCategories = await fetchInventoryCategory();
                // const fetchedWarehouses = await fetchWarehousesList();
                const [editItem, fetchedCategories, fetchedWarehouses] = await Promise.all([
                    fetchInventoryItem(id),
                    fetchInventoryCategory(),
                    fetchWarehousesList()
                ]);
                setItem(editItem.data[0]);
                setCategories(fetchedCategories.data);
                setWarehouses(fetchedWarehouses.data)
                console.log('categories', fetchedCategories.data);
                console.log('editItem', editItem.data[0]);
                console.log('warehouses', fetchedWarehouses.data);
            } catch (err) {
                setError('Failed to load item data');
            } finally {
                setIsLoading(false);
            }
        };
        loadItem();
    }, [id]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setItem(prevItem => {
            const updateItem = {
                ...prevItem,
                [name]: value
            }
            if (name === 'status') {
                if (!isInStock(value)) {
                    updateItem.quantity = 0;
                } else if (updateItem.quantity === 0) {
                    updateItem.quantity = 1;
                }
            }
            return updateItem;
        }
        )

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            await updateInventoryItem(id, item);
            navigate(`/inventory/${id}`);
        } catch (err) {
            setError('Failed to update item');
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        navigate(`/inventory/${id}`);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!item) return <div>Item not found</div>;

    return (
        <>
            <SectionHeader text={'Edit Inventory Item'} url={`/inventory/${id}`} />
            {error && <div className="error-message">{error}</div>}
            <form action="" onSubmit={handleSubmit}>
                <div className='item-form__details'>
                    <h2 className='h2-subheader'>Item Details</h2>
                    <label htmlFor="item_name">
                        <h3 className="item-name"></h3>
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
                    </label>
                    <label htmlFor="category">
                        <select name="category" id="category"
                            value={item.category || ''}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </label>

                </div>
                <div className="item-form__availability">
                    <h2>Item Availability</h2>
                    <div className='item-form__status'>
                        <h3>Status</h3>
                        <label htmlFor=""><input type="radio"
                            name='status'
                            value={'In Stock'}
                            checked={isInStock(item.status)}
                            onChange={handleChange}
                        />In Stock</label>
                        <label htmlFor=""><input type="radio"
                            name='status'
                            value={'Out of Stock'}
                            checked={isInStock(item.status)}
                            onChange={handleChange}
                        />Out of Stock</label>
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
                        </label>
                    )}
                    <label htmlFor="warehouse_id">
                        <h3>Warehouse</h3>
                        <select name="warehouse" id="warehouse_id"
                            value={warehouses.warehouse_name}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a warehouse</option>
                            {warehouses.map((warehouse) => (
                                <option key={warehouse.id} value={warehouse.id}>{warehouse.warehouse_name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <CTAButton text={'Cancel'} variant='secondary' onClick={handleCancel} type='button' />
                <CTAButton text={isSubmitting ? 'Saving...' : 'Save'} type='submit' disabled={isSubmitting} />

            </form></>
    )
}
