import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import OutfitGeneratorPage from "./pages/OutfitGeneratorPage";
import OutfitHistoryPage from "./pages/OutfitHistoryPage";
import WardrobeUploadPage from "./pages/WardrobeUploadPage";
import NotFoundPage from "./pages/NotFoundPage";

const AppWrapper = () => {
  const location = useLocation();
  const showNav = !["/", "/login"].includes(location.pathname);
  console.log({
    LandingPage,
    LoginPage,
    ProfilePage,
    OutfitGeneratorPage,
    OutfitHistoryPage,
    WardrobeUploadPage,
    NotFoundPage,
  });
  return (
    <>
      {showNav && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/generate" element={<OutfitGeneratorPage />} />
        <Route path="/upload" element={<WardrobeUploadPage />} />
        <Route path="/history" element={<OutfitHistoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {showNav && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
