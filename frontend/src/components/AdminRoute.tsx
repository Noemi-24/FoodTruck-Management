import type { PropsWithChildren } from "react";
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"


function AdminRoute({children}: Readonly<PropsWithChildren>){
    const {isAuthenticated, isAdmin} = useAuth();

    if (!isAuthenticated){
        return <Navigate to="/login" replace/> ;
    }

    if(!isAdmin){
        return <Navigate to="/dashboard" replace/>;
    }
    
    return children;
}

export default AdminRoute