import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCEQq3UjIOzDXyzhztbE_T696C5_WJUqw0",
  authDomain: "linkedin-clone-a0bb5.firebaseapp.com",
  projectId: "linkedin-clone-a0bb5",
  storageBucket: "linkedin-clone-a0bb5.appspot.com",
  messagingSenderId: "800578626579",
  appId: "1:800578626579:web:fa21aebe0c3956eb464be6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
const storage = firebase.storage();

export { auth, db, provider, storage };
