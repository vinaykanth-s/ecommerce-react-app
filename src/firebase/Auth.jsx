// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD-n_RfZPwBmBlhrVqBENkCNW7qcjn9K4U',
  authDomain: 'react-ecommerce-ec2ed.firebaseapp.com',
  projectId: 'react-ecommerce-ec2ed',
  storageBucket: 'react-ecommerce-ec2ed.appspot.com',
  messagingSenderId: '947460725712',
  appId: '1:947460725712:web:b3ec30d8f40bdc5de6b7d5',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
