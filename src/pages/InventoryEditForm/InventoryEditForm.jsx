import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchInventoryItem, updateInventoryItem, fetchInventoryCategory } from '../../utils/api';
import CTAButton from '../../components/LowLevelComponents/CTAButton/CTAButton.jsx'
import SectionHeader from '../../components/LowLevelComponents/SectionHeader/SectionHeader.jsx'

export default function InventoryEditForm() {
    const [item, setItem] = useState();
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const loadItem = async () => {
            try {
                const editItem = await fetchInventoryItem(id);
                const fetchedCategories = await fetchInventoryCategory();
                setItem(editItem.data);
                setCategories(fetchedCategories.data);
                console.log('categories', fetchedCategories.data);
                console.log('editItem', editItem.data);
            } catch (err) {
                setError('Failed to load item data');
            } finally {
                setIsLoading(false);
            }
        };
        loadItem();
    }, [id]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateInventoryItem(id, item);
        navigate(`/inventory/${id}`)
    }

    const handleCancel = () => {
        navigate(`/inventory/${id}`);
    };

    if (!item) return <div>Loading...</div>;

    return (
        <>
            <SectionHeader text={'Edit Inventory Item'} url="/inventory/:id" />
            <form action="" onSubmit={handleSubmit}>
                <div className='item-form'>
                    <h2 className='h2-subheader'>Item Details</h2>
                    <label htmlFor="item-name">
                        <h3 className="item-name">
                            <input type="text"
                                name='item-name'
                                id='item-name'
                                placeholder={item.name}
                                required
                                maxLength={50}
                            />
                        </h3>
                    </label>
                    <label htmlFor="item-description">
                        <h3 className="item-description">
                            <textarea name="item-description" id="item-description" cols="30" rows="10"
                                placeholder={item.description}
                                required
                            ></textarea>
                        </h3>
                    </label>
                    <label htmlFor="category">
                        {/* <select name="category" id="category">
                            {isLoading ? (
                                <option>Loading categories...</option>
                            ) : categories.length > 0 ? (
                                categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No categories available</option>
                            )}
                        </select> */}
                    </label>
                </div>
                <CTAButton text={'Cancel'} variant='secondary' onClick={handleCancel} type='button' />
                <CTAButton text={'Save'} type='submit' />

            </form></>
    )
}
