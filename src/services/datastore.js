import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDZdGSCSc8QRkSbsCvm_K8ssaL4tYE9qQM',
  authDomain: 'firenotes-b5057.firebaseapp.com',
  databaseURL: 'https://firenotes-b5057-default-rtdb.firebaseio.com',
  projectId: 'firenotes-b5057',
  storageBucket: 'firenotes-b5057.appspot.com',
//   messagingSenderId: '288381496934',
//   appId: '1:288381496934:web:3da95912f62f62207b87a7',
//   measurementId: 'G-VJZQY9FWPR',
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

export function getDB() {
  return database;
}

export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
}
