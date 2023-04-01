import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Admin } from './components/admin/Admin';
import { Website } from './components/website/Website';

export function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Website />,
    },
    {
      path: '/admin',
      element: <Admin />,
    },
  ]);

  return <RouterProvider router={router} />;
}
