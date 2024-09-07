import React from 'react'
import Warehouse from '../../components/Warehouse/Warehouse'
import InventoryList from '../../components/InventoryList/InventoryList'
import WarehouseForm from '../../components/WarehouseForm/WarehouseForm.jsx'

function Warehouses() {
  return (
    <div>
      <h1>Warehouses Page</h1>
      {/* <Warehouse /> */}
      <WarehouseForm />
    </div>
  )
}

export default Warehouses
