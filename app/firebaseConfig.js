import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBUb3cVSTAPC4pwi-Jbef1cuA8Ppz2al4U",
    authDomain: "thismatters-24fb3.firebaseapp.com",
    projectId: "thismatters-24fb3",
    storageBucket: "thismatters-24fb3.appspot.com",
    messagingSenderId: "1024864182441",
    appId: "1:1024864182441:web:091301dc6b7c654be5c9b8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
