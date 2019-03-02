import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDW8Jtqpq2RgTN-cYzwB_OKrBK42rfwEzE",
  authDomain: "listwar-react.firebaseapp.com",
  databaseURL: "https://listwar-react.firebaseio.com",
  projectId: "listwar-react",
  storageBucket: "listwar-react.appspot.com",
  messaagingSenderId: "6816718225"
};

firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

export default db;