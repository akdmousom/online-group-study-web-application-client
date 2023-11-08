import { Navigate, useLocation } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAuth from "../Hooks/UseAuth";
import PropTypes from 'prop-types'

const PrivetRoute = ({ children }) => {
    const {loading} = useContext(AuthContext)

    const {user} = useAuth()
    const {pathname} = useLocation();


    if (loading) {

        return (
            <div className="min-h-screen grid justify-center items-center">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        )
        
    }

    if (!user?.email) {
        return <Navigate state={pathname} to={'/login'}></Navigate>
    }

    
    return children
};

PrivetRoute.propTypes={
    children: PropTypes.node,
}

export default PrivetRoute;