import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const PrivetRoute = ({ children }) => {
    const {loading} = useContext(AuthContext)

    if (loading) {

        return <progress className="progress w-56"></progress>
        
    }

    
    return children
};

export default PrivetRoute;