// Authentication context provider
import { useEffect, useState } from "react";
import { createContext } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../FirebaseConf/FirebaseConfig";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () =>{
        return signInWithPopup(auth,googleProvider)
    }

    const logoutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
        const subscribe = onAuthStateChanged(auth, (currentUser)=>{
            if (currentUser) {

                setUser(currentUser)
                setLoading(false)
                
            }
        })
        return ()=>{
           return subscribe();
        }
    },[])



    const value = {
        user,
        createUser,
        loginUser,
        logoutUser,
        loading,
        googleLogin
    


    }

    return (
        <AuthContext.Provider value={value}>

            {children}
            
        </AuthContext.Provider >
    );
};

AuthProvider.propTypes={
    children: PropTypes.node,
}

export default AuthProvider;