import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCGPv8gQym8ljErg89IxgBTLXpiBmyer8I',
	authDomain: 'strides-connect-1fde5.firebaseapp.com',
	projectId: 'strides-connect-1fde5',
	storageBucket: 'strides-connect-1fde5.appspot.com',
	messagingSenderId: '759140343398',
	appId: '1:759140343398:web:627f9e3735834ae1b7d7a7',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
