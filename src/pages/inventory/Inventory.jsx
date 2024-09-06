import React, { useEffect, useState } from 'react'
import CTAButton from '../../components/LowLevelComponents/CTAButton/CTAButton';
import InventoryItem from '../../components/InventoryItem/InventoryItem';
import InventoryList from '../../components/InventoryList/InventoryList.jsx'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchInventoryList, fetchInventoryItem } from '../../utils/api';

function Inventory() {
  const navigate = useNavigate();
  const [inventoryList, setInventoryList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { id } = useParams();

  // fetch inventory list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchInventoryList();
        setInventoryList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Fetch the selected item when id changes
  useEffect(() => {
    if (id) {
      const fetchItemData = async () => {
        try {
          const response = await fetchInventoryItem(id);
          setSelectedItem(response.data[0]);
        } catch (error) {
          console.log(error);
        }
      }
      fetchItemData();
    }
  }, [id])

  // Handle item click
  const handleItemClick = (itemId) => {
    navigate(`/inventories/${itemId}`)
  }


  return (
    <>
      {
        id ? (selectedItem && <InventoryItem inventoryItem={selectedItem} />) : (<InventoryList inventoryList={inventoryList} onItemClick={handleItemClick} />)
      }
    </>
  )
}

export default Inventory
