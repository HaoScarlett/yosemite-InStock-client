import React from 'react';
import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router-dom";

// Placeholder components
const Warehouses = () => <h2>Warehouses</h2>;
const Inventory = () => <h2>Inventory</h2>;
const NotFound = () => <h2>404: Page Not Found</h2>;

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