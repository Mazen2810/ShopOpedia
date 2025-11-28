// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAYZtQnlOPoAt60ygXAm2Sk9r9flIIhypk',
  authDomain: 'shopopedia-52f34.firebaseapp.com',
  projectId: 'shopopedia-52f34',
  storageBucket: 'shopopedia-52f34.firebasestorage.app',
  messagingSenderId: '824624588010',
  appId: '1:824624588010:web:1c9e5038ec243e439d6393',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { app as firebaseApp, db, auth }
