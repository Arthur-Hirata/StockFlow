import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./App/ProtectedRoute/ProtectedRoute";
import Layout from "./App/Layout/Layout"
import Home from "./App/Layout/Outlet/Home/Home";
import Products from "./App/Layout/Outlet/Products/products";
import Cadastro from "./App/Layout/Outlet/Cadastro/Cadastro";
import Users from "./App/Layout/Outlet/Users/Users";
import Logs from "./App/Layout/Outlet/Historic/Logs";
import Login from "./App/Login/Login";

import './App.css'

function App() {
  
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element ={ <Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/Products" element={<Products />}/>
            <Route path="/Cadastro" element={<Cadastro />}/>
            <Route path="/Users" element={<Users />}/>
            <Route path="/Logs" element={<Logs />}/>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
