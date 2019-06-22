import firebase from "firebase";
import { expression } from "@babel/template";

var firebaseConfig = {
  apiKey: "AIzaSyCy2ORALc4jTx90qSa-0EUS6nOJQLCZZ_U",
  authDomain: "openhack-5bca3.firebaseapp.com",
  databaseURL: "https://openhack-5bca3.firebaseio.com",
  projectId: "openhack-5bca3",
  storageBucket: "openhack-5bca3.appspot.com",
  messagingSenderId: "1048548423850",
  appId: "1:1048548423850:web:f5ebcab1b41037d0"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
