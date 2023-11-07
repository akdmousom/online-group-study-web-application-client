import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAuth from "../Hooks/UseAuth";


const PrivetRoute = ({ children }) => {
    const {loading} = useContext(AuthContext)

    const {user} = useAuth()

    if (loading) {

        return (
            <div className="min-h-screen grid justify-center items-center">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        )
        
    }

    if (!user?.email) {
        return <Navigate to={'/'}></Navigate>
    }

    
    return children
};

export default PrivetRoute;