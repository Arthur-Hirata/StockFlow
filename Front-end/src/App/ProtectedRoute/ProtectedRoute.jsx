import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function ProtectedRoute(){
   const [authorized, setAuthorized] = useState(() => {
    const userToken = localStorage.getItem("token")
    return userToken ? null : false
   })

   useEffect(()=> {
        const userToken = localStorage.getItem("token")
        if (!userToken){
            return
        }
        async function verifyIdentity(){
            const response = await fetch('http://127.0.0.1:5000/verifyToken', {
                method : 'GET',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                }
            })
            setAuthorized(response.ok)
        }
        
        verifyIdentity();
   }, []);

   if (authorized === null){
    return null
   }
   return authorized ? <Outlet /> : <Navigate to="/login" replace />
 }
export default ProtectedRoute