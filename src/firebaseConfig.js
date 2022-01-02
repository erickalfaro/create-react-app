import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDQFbuCZS82AgwhHLE-YIKc55vQES3hXvA",
    authDomain: "finapse-7769f.firebaseapp.com",
    databaseURL: "https://finapse-7769f-default-rtdb.firebaseio.com",
    projectId: "finapse-7769f",
    storageBucket: "finapse-7769f.appspot.com",
    messagingSenderId: "347704011129",
    appId: "1:347704011129:web:cf97e1b049379a5993a7a8",
    measurementId: "G-LB5R6MLJH8"
  };

  firebase.initializeApp(firebaseConfig)    
  const db = firebase.firestore()    
  const TestRef = db.collection('myDB')

  export {TestRef}