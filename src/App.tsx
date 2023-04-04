import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AdminLazy } from './components/LazyComponents';
import { Website } from './components/website/Website';

export function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Website />,
    },
    {
      path: '/admin',
      element: (
        <Suspense fallback="OOP">
          <AdminLazy />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
