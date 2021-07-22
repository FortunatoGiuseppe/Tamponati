import { boot } from 'quasar/wrappers';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC0U9krXsM1eF-QgXtfAGwy5ZtRXLVB9hQ',
  authDomain: 'tamponati-25d2c.firebaseapp.com',
  projectId: 'tamponati-25d2c',
  storageBucket: 'tamponati-25d2c.appspot.com',
  messagingSenderId: '979874903698',
  appId: '1:979874903698:web:67a65cc709a3b23a09184b',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const marcaTemp = firebase.firestore.FieldValue.serverTimestamp;

export { db, auth, marcaTemp };

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
});
