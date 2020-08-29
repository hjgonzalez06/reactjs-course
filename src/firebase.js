import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyA8Ua0rVRa7OEo4_PdCiWbGZ-Jw4togxyQ",
    authDomain: "reactjs-rickandmorty.firebaseapp.com",
    databaseURL: "https://reactjs-rickandmorty.firebaseio.com",
    projectId: "reactjs-rickandmorty",
    storageBucket: "reactjs-rickandmorty.appspot.com",
    messagingSenderId: "625883175772",
    appId: "1:625883175772:web:e52f3b7319d474fd7eff99"
};

firebase.initializeApp(firebaseConfig);

let database = firebase.firestore().collection('favorites');

export function loginWithGoogle(){

    let provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider)
        .then(snap => snap.user);

};

export function logoutWithGoogle(){

    firebase.auth().signOut();

};

export function updateDatabase(array, uid){

    return database.doc(uid).set({array});

};