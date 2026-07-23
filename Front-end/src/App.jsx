import { Routes, Route } from "react-router-dom";
import Login from "./App/Login/Login";
import Layout from "./App/Layout/Layout"
import Home from "./App/Layout/Outlet/Home/Home";
import Products from "./App/Layout/Outlet/Products/products";
import ProtectedRoute from "./App/ProtectedRoute/ProtectedRoute";
import './App.css'

function App() {
  
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element ={ <Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/Products" element={<Products />}/>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
