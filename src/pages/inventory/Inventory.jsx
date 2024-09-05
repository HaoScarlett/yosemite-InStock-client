import React from 'react'
import InOutStock from '../../components/InOutStock/InOutStock';


function Inventory() {
  return (
    <div>
      <h1>inventory page</h1>
      <InOutStock inStock={true}/>
      <InOutStock inStock={false}/>
    </div>
  )
}

export default Inventory
