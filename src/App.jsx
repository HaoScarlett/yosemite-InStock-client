import React from 'react';
import './App.scss';
import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router-dom";
import Warehouses from './pages/warehouses/warehouses';
import Inventory from './pages/inventory/inventory';
import NotFound from './pages/NotFound/NotFound';
import Header from './components/Header/Header.jsx';
// Layout component
const Layout = () => {
  return (
    <div>
        <Header />
        <Outlet />
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
    ],
  },
  { path: "*", element: <NotFound /> },
]);

// App component
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;