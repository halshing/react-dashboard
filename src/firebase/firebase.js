import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyA1VH7n50hCIojtSzJCqz9BxiVsgvYsa8I",
    authDomain: "servicefinder-cce32.firebaseapp.com",
    databaseURL: "https://servicefinder-cce32.firebaseio.com",
    projectId: "servicefinder-cce32",
    storageBucket: "servicefinder-cce32.appspot.com",
    messagingSenderId: "225556295177"
};

if (!firebase.apps.length)
    firebase.initializeApp(config);

const auth = firebase.auth();
const database = firebase.database();

export {
    auth,
    database
};