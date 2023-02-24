import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import * as firestore from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseApp = {
  apiKey: 'AIzaSyCDgQaVaH4e7NJetvKFT8EBTJlIdTlOL70',
  authDomain: 'react-firebase-saga.firebaseapp.com',
  projectId: 'react-firebase-saga',
  storageBucket: 'react-firebase-saga.appspot.com',
  messagingSenderId: '716502210167',
  appId: '1:716502210167:web:80c11e4423d220e9c55872',
};

const app = initializeApp(firebaseApp);
export const auth = getAuth(app);
export const db = firestore.getFirestore(app);
export const storage = getStorage(app);
export default app;
