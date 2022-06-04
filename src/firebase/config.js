import firebase from 'firebase/compat/app' ;
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDddz_hguFiWjRf5i_hCjRaQefNScXuS2E',
  authDomain: 'fitest-io.firebaseapp.com',
  databaseURL: 'https://fitest-io.firebaseio.com',
  projectId: 'fitest-io',
  storageBucket: 'fitest-io.appspot.com',
  messagingSenderId: '753002158677',
  appId: '1:753002158677:ios:981e489ba265d45ade92dc',
};

let firebase_app; 

if (firebase.apps.length === 0) {
  console.log("initializing app w/ Firebase config...")
  firebase_app = firebase.initializeApp(firebaseConfig);
} else {
  console.log("initializing app w/o Firebase config :(")
  firebase_app = firebase.app();
}

export { firebase_app, firebase };