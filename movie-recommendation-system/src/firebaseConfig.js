import firebase from 'firebase';

const Config = {
    apiKey: "AIzaSyDlal5nFhxzgV_saGrNzKqd4HQIp4K15bY",
    authDomain: "blockbusterproject.firebaseapp.com",
    databaseURL: "https://blockbusterproject.firebaseio.com",
    projectId: "blockbusterproject",
    storageBucket: "blockbusterproject.appspot.com",
    messagingSenderId: "973619174692",
    appId: "1:973619174692:web:b7accad74795f1842967b1",
    measurementId: "G-D9C8HJF0L2"
};

// Initialize Firebase
const firebaseConfig = firebase.initializeApp(Config);

//https://firebase.google.com/docs/database/web/start?authuser=0

export default firebaseConfig;



