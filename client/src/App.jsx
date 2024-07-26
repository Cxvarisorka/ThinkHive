import Login from "./components/Login.jsx"
import Navbar from "./components/Navbar.jsx"
import Register from "./components/Register.jsx"

import { BrowserRouter as Router, Routes, Route } from'react-router-dom';

const App = () => {
  return (
    <>
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      
    </>
  )
}

export default App
