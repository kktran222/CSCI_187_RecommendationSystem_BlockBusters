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

//async function firebaseTest() {
//    var db = firebase.initializeApp(Config).database;
//    
//    db.ref.set({test: "hello", test2: "this is", test3: "a test"});
//};


