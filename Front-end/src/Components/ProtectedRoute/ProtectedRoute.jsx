import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function ProtectedRoute(){
    const [authorized, setAuthorized] = useState(() => {
    const userToken = localStorage.getItem("token")
    return userToken ? null : false
   })
    const [user, setUser] = useState([])
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
            const data = await response.json()
            setAuthorized(response.ok)
            if (response.ok){
                setUser(data.user)
            }
        }
        
        verifyIdentity();
   }, []);

   if (authorized === null){
    return null
   }
   return authorized ? <Outlet context={user}/> : <Navigate to="/login" replace />
 }
export default ProtectedRoute