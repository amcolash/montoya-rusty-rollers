import React, { Suspense } from 'react';

import { AdminLazy } from './components/LazyComponents';
import { Website } from './components/website/Website';
import { useLocation } from './hooks/useLocation';

export function App() {
  const { adminMode } = useLocation();

  if (adminMode)
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminLazy />
      </Suspense>
    );
  else return <Website />;
}
