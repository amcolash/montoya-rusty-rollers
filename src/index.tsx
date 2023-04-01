import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { cssRule } from 'typestyle';
import { App } from './App';

cssRule('body', {
  margin: 0,
  fontFamily: 'sans-serif',
});

createRoot(document.getElementById('root')!).render(<App />);
