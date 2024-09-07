import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchInventoryItem, updateInventoryItem, fetchInventoryCategory, fetchWarehousesList } from '../../utils/api';
import CTAButton from '../../components/LowLevelComponents/CTAButton/CTAButton.jsx'
import SectionHeader from '../../components/LowLevelComponents/SectionHeader/SectionHeader.jsx'

export default function InventoryEditForm() {
    const [item, setItem] = useState({});
    const [categories, setCategories] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const loadItem = async () => {
            try {
                const editItem = await fetchInventoryItem(id);
                const fetchedCategories = await fetchInventoryCategory();
                const fetchedWarehouses = await fetchWarehousesList()
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
        setItem(prevItem => (
            {
                ...prevItem,
                [name]: value
            }
        ))

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateInventoryItem(id, item);
            navigate(`/inventory/${id}`);
        } catch (err) {
            setError('Failed to update item');
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
            <SectionHeader text={'Edit Inventory Item'} url="/inventory/:id" />
            <form action="" onSubmit={handleSubmit}>
                <div className='item-form__details'>
                    <h2 className='h2-subheader'>Item Details</h2>
                    <label htmlFor="item_name">
                        <h3 className="item-name"></h3>
                        <input type="text"
                            name='item_name'
                            id='item_name'
                            value={item.item_name}
                            placeholder={item.item_name}
                            onChange={handleChange}
                            required
                            maxLength={50}
                        />
                    </label>
                    <label htmlFor="item-description">
                        <h3 className="item-description">
                            <textarea name="description" id="description" cols="30" rows="10"
                                value={item.description}
                                onChange={handleChange}
                                placeholder={item.description}
                                required
                            ></textarea>
                        </h3>
                    </label>
                    <label htmlFor="category">
                        <select name="category" id="category"
                            value={item.category}
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
                        <label htmlFor="">
                            <h3>Status</h3>
                            <label htmlFor=""><input type="radio"
                                name='radio'
                                value={'In Stock'}
                            />In Stock</label>
                            <label htmlFor=""><input type="radio"
                                name='radio'
                                value={'Out of Stock'}
                            />Out of Stock</label>
                        </label>
                    </div>
                    <label htmlFor="">
                        <h3>Warehouse</h3>
                        <select name="warehouse" id="warehouse"
                            value={warehouses.warehouse_name}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a warehouse</option>
                            {warehouses.map((warehouse, index) => (
                                <option key={index} value={warehouse.warehouse_name}>{warehouse.warehouse_name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <CTAButton text={'Cancel'} variant='secondary' onClick={handleCancel} type='button' />
                <CTAButton text={'Save'} type='submit' />

            </form></>
    )
}
