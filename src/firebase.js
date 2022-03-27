import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
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
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };
