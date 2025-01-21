import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CourseSection from "./components/CourseSection";
import WhyChooseSection from "./components/WhyChooseSection";
import LoginPage from "./components/Login";
import SignupPage from "./components/SignupPage";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CourseSection />
      <WhyChooseSection />
    </div>
  );
}

function App() {
  return (
    <div className="bg-gradient-to-r from-pink-200 via-orange-100 to-yellow-100 min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;