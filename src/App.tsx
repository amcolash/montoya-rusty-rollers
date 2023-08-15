import React, { Suspense } from 'react';

import { AdminLazy } from './components/LazyComponents';
import { Website } from './components/website/Website';
import { useLocation } from './hooks/useLocation';

const loading = document.querySelector('#loading');
if (loading) loading.remove();

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
