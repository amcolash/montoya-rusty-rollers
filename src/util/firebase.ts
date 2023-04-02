// Import the functions you need from the SDKs you need
import { getDatabase } from '@firebase/database';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDC6ZlaCVZK1CzCFUjcGL9fi1u7ziIXIN0',
  authDomain: 'montoya-rusty-rollers.firebaseapp.com',
  projectId: 'montoya-rusty-rollers',
  storageBucket: 'montoya-rusty-rollers.appspot.com',
  messagingSenderId: '608435362631',
  appId: '1:608435362631:web:0fc34c74233d28052fca62',
  measurementId: 'G-RWS22TKSLG',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
