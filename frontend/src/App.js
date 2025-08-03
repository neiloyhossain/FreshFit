import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { isAuthenticated } from "./utils/auth";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import OutfitGeneratorPage from "./pages/OutfitGeneratorPage";
import OutfitHistoryPage from "./pages/OutfitHistoryPage";
import WardrobeUploadPage from "./pages/WardrobeUploadPage";
import NotFoundPage from "./pages/NotFoundPage";
import WardrobeListPage from "./pages/WardrobeListPage";
import RegisterPage from "./pages/RegisterPage";

const AppWrapper = () => {
  const location = useLocation();
  const showNav = !["/", "/login", "/register"].includes(location.pathname);
  const showFooter = !["/"].includes(location.pathname);
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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated()}><ProfilePage /></ProtectedRoute>} />
        <Route path="/account-settings" element={<ProtectedRoute isAuthenticated={isAuthenticated()}><AccountSettingsPage /></ProtectedRoute>} />
        <Route path="/generate" element={<ProtectedRoute isAuthenticated={isAuthenticated()}><OutfitGeneratorPage /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute isAuthenticated={isAuthenticated()}><WardrobeUploadPage /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute isAuthenticated={isAuthenticated()}><OutfitHistoryPage /></ProtectedRoute>} />
        <Route path="/wardrobe" element={<ProtectedRoute isAuthenticated={isAuthenticated()}><WardrobeListPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {showFooter && <Footer />}
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
