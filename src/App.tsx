import React, { Suspense } from 'react';

import { AdminLazy } from './components/LazyComponents';
import { Website } from './components/website/Website';

export function App() {
  if (window.location.hash === '#/admin')
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminLazy />
      </Suspense>
    );
  else return <Website />;
}
