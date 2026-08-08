import { Navigate ,useNavigate, Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import AccessDenied from "../AccessDenied/AccessDenied"
function AdminRoute(){
    const [isAdmin, setIsAdmin] = useState(null)
     const navigate = useNavigate()
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
        return <AccessDenied onClose={() => navigate("/", { replace: true })} />
    }
      return <Outlet />
}
export default AdminRoute
