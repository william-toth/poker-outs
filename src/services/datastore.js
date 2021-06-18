import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBCLOuklYb3TzAUmIwVn9MHKyFy1QouxlE',
  authDomain: 'codenames-46f98.firebaseapp.com',
  databaseURL: 'https://codenames-46f98-default-rtdb.firebaseio.com',
  projectId: 'codenames-46f98',
  storageBucket: 'codenames-46f98.appspot.com',
  messagingSenderId: '367504297588',
  appId: '1:367504297588:web:b86e46460021ed9bc20b21',
  measurementId: 'G-CZ5HSJ5KSE',
};
// Initialize Firebase
firebase.initializeApp(config);

// Get a reference to the database service
const database = firebase.database();

export function getDB() {
  return database;
}

export function fetchGrid(callback) {
  console.log(database);
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
