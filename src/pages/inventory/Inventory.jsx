import React from 'react'
import InOutStock from '../../components/InOutStock/InOutStock';
import InventoryList from '../../components/InventoryList/InventoryList';

function Inventory() {
  return (
    <div>
      <h1>inventory page</h1>
      <InOutStock inStock={true}/>
      <InOutStock inStock={false}/>
      <InventoryList />
    </div>
  )
}

export default Inventory
