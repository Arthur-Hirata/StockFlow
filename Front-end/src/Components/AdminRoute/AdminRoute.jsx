import { Navigate , Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
function AdminRoute(){
    const [isAdmin, setIsAdmin] = useState(null)
    useEffect(()=>{
        const userToken = localStorage.getItem("token")
        if (!userToken){
            <Navigate to="/Login" replace />
            return
        }
        async function verifyIdentity(){
            try{
                const response = await fetch("http://127.0.0.1:5000/verifyToken", {
                    method : 'GET',
                    headers: {
                            Authorization: `Bearer ${userToken}`,
                    }
                })
                if (!response.ok){
                    setIsAdmin(false)
                }
                const data = await response.json()
                setIsAdmin(data.role === 'admin')
            }
            catch {
                setIsAdmin(false)
            }
            }
        
        verifyIdentity()
    },[] )
    if (isAdmin === null){
        return null
    }
    if (!isAdmin){
         return <Navigate to="/" replace />
    }
      return <Outlet />
}
export default AdminRoute
