import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchInventoryItem, updateInventoryItem } from '../../utils/api';
import CTAButton from '../../components/LowLevelComponents/CTAButton/CTAButton.jsx'

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
        <form action="" onSubmit={handleSubmit}>

            <CTAButton text={'Cancel'} variant='secondary' onClick={handleCancel} type='button' />
            <CTAButton text={'Save'} type='submit' />

        </form>
    )
}
