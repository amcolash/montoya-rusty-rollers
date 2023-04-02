import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { cssRule } from 'typestyle';
import { App } from './App';

cssRule('html', {
  height: '100vh',
  overflow: 'hidden',
});

cssRule('body', {
  margin: 0,
  fontFamily: 'sans-serif',
  scrollSnapType: 'y proximity',
  overflowY: 'auto',
  height: '100vh',
});

createRoot(document.getElementById('root')!).render(<App />);
