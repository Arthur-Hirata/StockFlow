import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./App/ProtectedRoute/ProtectedRoute";
import Layout from "./App/Layout/Layout"
import Home from "./App/Layout/Outlet/Home/Home";
import Products from "./App/Layout/Outlet/Products/products";
import Movimentações from "./App/Layout/Outlet/Movimentações/Movimentações";
import Cadastros from "./App/Layout/Outlet/Cadastros/Cadastros";
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
            <Route path="/Movimentacoes" element={<Movimentações />}/>
            <Route path="/Cadastros" element={<Cadastros />}/>
            <Route path="/Logs" element={<Logs />}/>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
