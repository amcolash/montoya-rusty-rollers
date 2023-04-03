import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { cssRule } from 'typestyle';
import { App } from './App';
import { createVariables } from './util/styles';

cssRule('html', {
  height: '100vh',
  overflow: 'hidden',
});

cssRule('body', {
  margin: 0,
  fontFamily: '"Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  scrollSnapType: 'y proximity',
  overflowY: 'auto',
  height: '100vh',
});

createVariables();

createRoot(document.getElementById('root')!).render(<App />);
