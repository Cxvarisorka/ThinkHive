import Navbar from "./components/Navbar.jsx"
import Profile from "./components/Profile.jsx";
import Footer from "./components/Footer.jsx";

import { BrowserRouter as Router, Routes, Route } from'react-router-dom';

// Pages
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";




const App = () => {
  return (
    <>
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
        </Routes>
      </main>
      
      <Footer />
    </>
  )
}

export default App
