import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseConfig } from "./config";

initializeApp(firebaseConfig);
export const auth = getAuth();

export function signup(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password).then((cred)=>{
        console.log(cred);
        
    }).catch((err)=>{console.log(err)})
}

export function signout(){
    signOut(auth).then(()=>{
        alert("Signed Out Successfully!");
    }).catch((e)=>{
        console.log(e);
    })
}

export function login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password).then((cred)=>{
        console.log(cred);
    }).catch((err)=>{alert(err)})
}
