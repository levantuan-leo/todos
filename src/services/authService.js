import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

function logOut() {
  return signOut(auth);
}

function googleSignIn() {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
}

function facebookSignIn() {
  return new Promise((resolve, reject) => {
    const facebookAuthProvider = new FacebookAuthProvider();

    // Optional
    facebookAuthProvider.setCustomParameters({
      // Forces password re-entry.
      auth_type: "reauthenticate",
      display: "popup",
    });

    signInWithPopup(auth, facebookAuthProvider)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
}

export { auth, logIn, signUp, logOut, googleSignIn, facebookSignIn };
export default app;
