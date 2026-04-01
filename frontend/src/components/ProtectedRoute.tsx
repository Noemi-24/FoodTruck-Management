import type { PropsWithChildren } from "react";
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

function ProtectedRoute({children}:PropsWithChildren) {
    const {isAuthenticated} = useAuth();

        if (!isAuthenticated){
            return <Navigate to="/login" replace/> ;
        }
    return children; 
}

export default ProtectedRoute