import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
   apiKey: "AIzaSyAUFNVPsLXeaIapM-Vfv1OXQQ_tRpDjSks",
   authDomain: "movieweb-2b841.firebaseapp.com",
   databaseURL: "https://movieweb-2b841-default-rtdb.firebaseio.com",
   projectId: "movieweb-2b841",
   storageBucket: "movieweb-2b841.appspot.com",
   messagingSenderId: "95710154174",
   appId: "1:95710154174:web:1cfb3707a43a9d522abdef",
   measurementId: "G-PBHK5MFRPV",
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
