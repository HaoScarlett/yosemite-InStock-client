import React from 'react';
import './App.scss';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Warehouses from './pages/warehouses/Warehouses.jsx';
import Inventory from './pages/inventory/inventory';
import NotFound from './pages/NotFound/NotFound';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
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
      { path: "/:id", element:<WarehouseDetails />},
      { path: "/:id/edit", element:<EditWarehouse />},
      { path: "/:id/new", element:<AddWarehouse />},

      { path: "inventory", element: <Inventory /> },
      { path: "inventory/:id", element:<InventoryDetails />},
      { path: "inventory/:id/edit", element:<EditInventory />},
      { path: "inventory/:id/new", element:<AddInventory />},
    ],
  },
  { path: "*", element: <NotFound /> },
]);

// App component
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;