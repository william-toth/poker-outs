import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBCLOuklYb3TzAUmIwVn9MHKyFy1QouxlE',
  authDomain: 'codenames-46f98.firebaseapp.com',
  databaseURL: 'https://codenames-46f98-default-rtdb.firebaseio.com',
  projectId: 'codenames-46f98',
  storageBucket: 'codenames-46f98.appspot.com',
  messagingSenderId: '367504297588',
  appId: '1:367504297588:web:7425dd18b535493dc20b21',
  measurementId: 'G-W9EMS4BXJ0',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

export function getDB() {
  return database;
}

export function fetchGrid(callback) {
  database.ref('grid').on('value', (snapshot) => {
    const newGrid = snapshot.val();
    callback(newGrid);
  });
}

export function fetchScore(callback) {
  database.ref('score').on('value', (snapshot) => {
    const newScore = snapshot.val();
    callback(newScore);
  });
}
