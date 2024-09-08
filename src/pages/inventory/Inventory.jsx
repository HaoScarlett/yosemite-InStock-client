import React, { useEffect, useState, useCallback } from 'react'
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


  const fetchInventoryData = useCallback(async () => {
    console.log('Fetching inventory list');
    setIsLoading(true);
    try {
      const response = await fetchInventoryList();
      console.log('Inventory list fetched:', response.data);
      setInventoryList(response.data || []);
    } catch (error) {
      setError('Failed to fetch inventory list. Please try again later.');
      console.error('Error fetching inventory list:', error);
      setInventoryList([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!id) {
      fetchInventoryData();
    }
  }, [id, fetchInventoryData]);

  useEffect(() => {
    const fromEditPage = location.state && location.state.fromEdit;
    if (fromEditPage && !id) {
      fetchInventoryData();
    }
  }, [location, id, fetchInventoryData]);

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


  // Handle "Add New Item" button click
  // const handleAddNewItem = () => {
  //   navigate('/inventory/add');
  // }


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
        <div>
          <InventoryList inventoryList={inventoryList} onItemClick={handleItemClick} />

          {/* Handle "Add New Item" button */}
          <div style={{ marginTop: '20px' }}>
            {/* <CTAButton
              text="+ Add New Item"
              onClick={handleAddNewItem}
              variant="primary"
            /> */}
          </div>
        </div>
      )}
    </>
  )
}

export default Inventory
