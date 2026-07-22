import { Routes, Route } from "react-router-dom";
import Login from "./App/Login/Login";
import Layout from "./App/Layout/Layout"
import Home from "./App/Layout/Outlet/Home/Home";
import './App.css'

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element ={ <Layout />}>
          <Route path="/Home" element={<Home />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
