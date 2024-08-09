import Navbar from "./components/Navbar.jsx"
import MyProfile from "./components/MyProfile.jsx";
import Footer from "./components/Footer.jsx";

import { BrowserRouter as Router, Routes, Route } from'react-router-dom';


// Pages
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import Questions from "./components/Questions.jsx";
import QuestionDetail from "./components/QuestionDetail.jsx";




const App = () => {
  return (
    <>
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/questions" element={<Questions />}/>
          <Route path="/question/:id" element={<QuestionDetail />}/>
        </Routes>
      </main>
      
      <Footer />
    </>
  )
}

export default App
