// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, addDoc, query, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { Vector3 } from 'three'

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


// 話したい札新規登録
async function addTalkTag(
  name: any, 
  uuid: any,
  affiliation: any,
  comment: any,
  message: any,
  position: Vector3,
  isPublic: boolean
) {
  console.log(
    name, 
  uuid,
  comment,
  message,
  position,
  isPublic,
  );
  const update = Timestamp.now(); 
  const docRef = await setDoc(doc(db, "talktag-data", uuid), {
    name: name, 
    uuid: uuid,
    affiliation: affiliation,
    comment: comment,
    message: message,
    position: [position.x, position.y, position.z],
    isPublic: isPublic
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

export {db, googleProvider, auth, addTalkTag, assignRoom};