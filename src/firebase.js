// Your web app's Firebase configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAyoieqx2TiNMgrXYS1BzAuEAsFSHd2MVA",
  authDomain: "fb-crud-e1adb.firebaseapp.com",
  projectId: "fb-crud-e1adb",
  storageBucket: "fb-crud-e1adb.appspot.com",
  messagingSenderId: "914672343753",
  appId: "1:914672343753:web:fd64c8f41a420f3c0a0b18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default firebaseConfig;
