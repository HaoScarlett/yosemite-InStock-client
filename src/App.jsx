import React from 'react';
import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router-dom";
import Warehouses from './pages/warehouses/warehouses';
import Inventory from './pages/inventory/inventory';
import NotFound from './pages/NotFound/NotFound';
// Layout component
const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Warehouses</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
        </ul>
      </nav>
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