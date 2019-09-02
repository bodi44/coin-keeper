import * as firebase from "firebase/app";

import "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyBLKlyw4QMAaxKveJF3Yjm5xAzTixOXNDE',
  authDomain: 'coin-keeper-c0f9d.firebaseapp.com',
  databaseURL: 'https://coin-keeper-c0f9d.firebaseio.com',
  projectId: 'coin-keeper-c0f9d',
  storageBucket: 'coin-keeper-c0f9d.appspot.com',
  messagingSenderId: '944068254507',
  appId: '1:944068254507:web:6ae053b57acb225e',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
