import { initializeApp } from "firebase/app";
import {getStorage} from "@firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDRqOIOsDWrMMYgN1vBzdiZqPRqeD-Gdxw",
    authDomain: "omegastore-427b9.firebaseapp.com",
    projectId: "omegastore-427b9",
    storageBucket: "omegastore-427b9.appspot.com",
    messagingSenderId: "240694915616",
    appId: "1:240694915616:web:447fcad75739f2cd07c245",
    measurementId: "G-8WY59PN8NW"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);