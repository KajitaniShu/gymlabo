// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, query, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithEmailAndPassword, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOr2xPGYz_OmmZVLBcCuonX6ZZptC1M40",
  authDomain: "v-gymlabo.firebaseapp.com",
  projectId: "v-gymlabo",
  storageBucket: "v-gymlabo.appspot.com",
  messagingSenderId: "1023272560483",
  appId: "1:1023272560483:web:1f290d89b363a1ecf11556",
  measurementId: "G-PYZ6JEE6E3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();


// ユーザー情報新規登録
async function addUser(name: any, language: any, uuid: any) {
  const update = Timestamp.now(); 
  const docRef = await setDoc(doc(db, "user-data", uuid), {
    name: name,
    uuid: uuid,
    level: 1.0,
    money: 0,
    win: 0,
    lose: 0,
    assign: null,
    assignType: null,
    language: language,
    update: update,
    friends: {},
    history: {}
  });
}

// ユーザー情報変更
async function assignRoom(
  isHost:   boolean,
  uuid:     string,
  roomId:   string,
) {
const update = Timestamp.now();
const docRef = await updateDoc(doc(db, "user-data", uuid), {
  update: update, 
  assign: roomId,
  assignType: isHost ? "host" : "guest",
});
}

export {db, googleProvider, auth, addUser, assignRoom};