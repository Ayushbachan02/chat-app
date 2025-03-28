import Navbar from "../src/components/Navbar.jsx"
import HomePage from "../src/pages/HomePage.jsx"
import SignUpPage from "../src/pages/SignUpPage.jsx"
import LoginPage from "../src/pages/LoginPage.jsx"
import SettingsPage from "../src/components/Navbar.jsx"
import ProfilePage from "../src/pages/ProfilePage.jsx"

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js"
import { useThemeStore } from "../store/useThemeStore.js"
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
