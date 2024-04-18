import { Routes, Route } from "react-router-dom";
/* Pages */
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/Userpage";
/* Re-Routing */
import IsAdmin from "./components/routing/IsAdmin";
import IsLoggedOut from "./components/routing/IsLoggedOut";
/* Components */
import Navbar from "./components/Navbar/Navbar";

import { createContext, useState } from "react";
import useAuth from "./context/useAuth";

import AuthContextWrapper from "./context/AuthContextWrapper";
import Userpage from "./pages/Userpage";

function App() {
  // const { user } = useAuth();
  return (
    <>
      <AuthContextWrapper>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />

          <Route element={<IsLoggedOut />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<IsAdmin />}>
            <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          </Route>
          <Route path="/user" element={<Userpage />} />
          {/* <Route path="/boardgames/:gameId" element={<OneGamePage />} /> */}
        </Routes>
      </AuthContextWrapper>
    </>
  );
}

export default App;
