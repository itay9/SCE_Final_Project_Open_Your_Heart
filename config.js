// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfk2mWM9pe00OXd6jO2LlGrTIXeNxlTsM",
  authDomain: "finalprojectsce-2ee3a.firebaseapp.com",
  databaseURL: "https://finalprojectsce-2ee3a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "finalprojectsce-2ee3a",
  storageBucket: "finalprojectsce-2ee3a.appspot.com",
  messagingSenderId: "58981349956",
  appId: "1:58981349956:web:41090b35033961f8051a11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;