import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_FIREBASE,
  authDomain:  process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId:  process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE,
  messagingSenderId:  process.env.NEXT_PUBLIC_MESSAGE,
  appId:  process.env.APPID
};


const app = initializeApp(firebaseConfig);



const auth = getAuth(app);

export {auth};