import React from 'react';
import './App.scss';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import WarehouseInventory from './components/WarehouseInventory/WarehouseInventory.jsx'
import Inventory from './pages/inventory/Inventory';
import Warehouses from './pages/warehouses/Warehouses';
import NotFound from './pages/NotFound/NotFound';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import NewWarehouse from './pages/NewWarehouse/NewWarehouse.jsx';
import InventoryItem from './components/InventoryItem/InventoryItem.jsx'
import InventoryEditForm from './pages/InventoryEditForm/InventoryEditForm.jsx'
import AddNewInventoryItem from './pages/AddNewInventoryItem/AddNewInventoryItem.jsx';
import EditWarehouse from './pages/EditWarehouse/EditWarehouse.jsx';

// Layout component
const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

// Create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Warehouses /> },
      // use for test page:{ index: true, element: <EditWarehouse /> },
      { path: "inventory", element: <Inventory /> },
      { path: "inventory/add", element: <AddNewInventoryItem /> },
      { path: "warehouses/new", element: <NewWarehouse /> },
      { path: "warehouses/:id", element: <WarehouseInventory /> },
      { path: "warehouses/:id/edit", element: <EditWarehouse /> },
      { path: "inventory/:id", element: <Inventory /> },
      { path: "inventory/:id/edit", element: <InventoryEditForm /> }
    ],
  },
  { path: "*", element: <NotFound /> },
]);

// App component
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;