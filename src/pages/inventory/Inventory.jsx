import React, { useEffect, useState } from 'react'
import CTAButton from '../../components/LowLevelComponents/CTAButton/CTAButton';
import InventoryItem from '../../components/InventoryItem/InventoryItem';
import InventoryList from '../../components/InventoryList/InventoryList.jsx'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchInventoryList, fetchInventoryItem } from '../../utils/api.js';

function Inventory() {
  const navigate = useNavigate();
  const location = useLocation();
  const [inventoryList, setInventoryList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  console.log('Inventory component rendered');
  console.log('Current location:', location);
  console.log('Current ID:', id);


  // fetch inventory list
  useEffect(() => {
    console.log('Fetching inventory list');
    const fetchData = async () => {
      if (!id) {
        setIsLoading(true);
        try {
          const response = await fetchInventoryList();
          console.log('Inventory list fetched:', response.data); // Inspect response data
          setInventoryList(response.data || []);
        } catch (error) {
          setError('Failed to fetch inventory list. Please try again later.');
          console.error('Error fetching inventory list:', error);
          setInventoryList([]);
        } finally {
          setIsLoading(false)
        }
      }
    };
    fetchData();
  }, [id]);

  // Fetch the selected item when id changes
  useEffect(() => {
    console.log('ID changed, fetching item data');
    if (id) {
      const fetchItemData = async () => {
        setIsLoading(true)
        try {
          const response = await fetchInventoryItem(id);
          setSelectedItem(response.data[0]);
        } catch (error) {
          console.log(error);
          setError('Failed to fetch inventory item. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      }
      fetchItemData();
    } else {
      setSelectedItem(null);
    }
  }, [id])

  // Handle item click
  const handleItemClick = (itemId) => {
    console.log('Item clicked:', itemId);
    navigate(`/inventory/${itemId}`)
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const isItemView = location.pathname.includes(`/inventory/`) && id;
  console.log('Is item view:', isItemView);

  return (
    <>
      {isItemView ? (
        selectedItem ? (
          <InventoryItem inventoryItem={selectedItem} />
        ) : (
          <div>Loading item...</div>
        )
      ) : (
        <InventoryList inventoryList={inventoryList} onItemClick={handleItemClick} />
      )}
    </>
  )
}

export default Inventory
