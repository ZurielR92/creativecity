// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsa_HAHMXvfiDeRKni65jO2mF9FWQmkI4",
    authDomain: "creative-city-f119c.firebaseapp.com",
    projectId: "creative-city-f119c",
    storageBucket: "creative-city-f119c.appspot.com",
    messagingSenderId: "803507280562",
    appId: "1:803507280562:web:51c5a0ce43eebeec3447ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);