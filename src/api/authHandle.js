import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseApp, getDatabaseCollection } from "./firbaseInitalization";

const auth = getAuth(firebaseApp);

const logOut = async () => {
    await signOut(auth);
}


export {auth, logOut}