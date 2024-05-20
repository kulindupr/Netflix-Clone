import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from 'react-toastify';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqmTksxhUWfstG8bpkOdTsjDRqou1USZw",
    authDomain: "netflix-clone-70c16.firebaseapp.com",
    projectId: "netflix-clone-70c16",
    storageBucket: "netflix-clone-70c16.appspot.com",
    messagingSenderId: "515402851932",
    appId: "1:515402851932:web:80a6e0c62c68717c612899"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign up function
const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.error("Error signing up: ", error.message);
        toast.error(error.code.split('/')[1].split('-').join(""));
        throw error; 
    }
};

// Login function
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error logging in: ", error.message);
        toast.error(error.code.split('/')[1].split('-').join(""));
    }
};

// Logout function
const logout = () => {
    try {
        signOut(auth);
    } catch (error) {
        console.error("Error logging out: ", error.message);
        toast.error(error.code.split('/')[1].split('-').join(""));
    }
};

export { auth, db, login, signup, logout };
