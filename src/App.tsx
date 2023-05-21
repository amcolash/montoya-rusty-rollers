import React, { Suspense } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { AdminLazy } from './components/LazyComponents';
import { Website } from './components/website/Website';

export function App() {
  const router = createHashRouter([
    {
      path: '/*',
      element: <Website />,
    },
    {
      path: '/admin',
      element: (
        <Suspense>
          <AdminLazy />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
