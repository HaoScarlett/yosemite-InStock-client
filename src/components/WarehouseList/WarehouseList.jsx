import React, { useEffect, useState } from 'react';
import { fetchWarehouseList } from '../../utils/api.js';
import WarehouseItemRow from '../WarehouseItemRow/WarehouseItemRow.jsx';
import SearchBar from '../LowLevelComponents/SearchBar/SearchBar.jsx';
import './WarehouseList.scss';

function WarehouseList() {
  const [warehouseList, setWarehouseList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWarehouseList();
        setWarehouseList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='warehouse-list layout'>
      <h1 className='warehouse-list__title h1-page-header'>Warehouses</h1>
      <SearchBar className='warehouse-list__search' />
      <table className='warehouse-table'>
        <thead>
          <tr className='warehouse-header h4-table-header'>
            <th>WAREHOUSE</th>
            <th>ADDRESS</th>
            <th>CONTACT NAME</th> 
            <th>CONTACT INFORMATION</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {warehouseList.map(warehouse => (
            <WarehouseItemRow key={warehouse.id} warehouse={warehouse} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WarehouseList;
