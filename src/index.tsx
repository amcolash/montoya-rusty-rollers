import emailjs from '@emailjs/browser';
import { render } from 'preact';
import React from 'react';

import { App } from './App';

// Init emailjs
const publicKey = 'Ht6JdHW9yl4CS63qN';
emailjs.init(publicKey);

// Redirect to proper admin page if needed
if (window.location.pathname === '/' && window.location.hash === '#admin') window.location.replace('/#/admin');

// Render website
const root = document.getElementById('root');
if (root) render(<App />, root);
