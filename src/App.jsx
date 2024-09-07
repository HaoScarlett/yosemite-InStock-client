import React from 'react';
import './App.scss';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Warehouses from './pages/warehouses/Warehouses.jsx';
import Inventory from './pages/inventory/inventory';
import NotFound from './pages/NotFound/NotFound';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import NewWarehouse from './pages/NewWarehouse/NewWarehouse.jsx';
import InventoryItem from './components/InventoryItem/InventoryItem.jsx'

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
      { path: "inventory", element: <Inventory /> },
      { path: "warehouses/new", element: <NewWarehouse />}
      { path: "inventory/:id", element: <Inventory /> },

    ],
  },
  { path: "*", element: <NotFound /> },
]);

// App component
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;