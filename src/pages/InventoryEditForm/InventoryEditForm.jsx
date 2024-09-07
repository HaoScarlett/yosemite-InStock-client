import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchInventoryItem, updateInventoryItem } from '../../utils/api';
import CTAButton from '../../components/LowLevelComponents/CTAButton/CTAButton.jsx'
import SectionHeader from '../../components/LowLevelComponents/SectionHeader/SectionHeader.jsx'
export default function InventoryEditForm() {
    const [item, setItem] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchItem = async () => {
            const data = await fetchInventoryItem(id)
            setItem(data)
        }
        fetchItem()
    }, [id])

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
                    <label htmlFor="">
                        <select name="category" id="category">
                            
                        </select>
                    </label>
                </div>
                <CTAButton text={'Cancel'} variant='secondary' onClick={handleCancel} type='button' />
                <CTAButton text={'Save'} type='submit' />

            </form></>
    )
}
