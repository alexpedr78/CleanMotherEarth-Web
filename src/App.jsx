import { Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";

// import "react-leaflet/dist/react-leaflet.css";

/* Pages */
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import AppPage from "./pages/AppPage";
import HomePage from "./pages/HomePage";
/* Re-Routing */
import IsAdmin from "./components/routing/IsAdmin";
import IsLoggedOut from "./components/routing/IsLoggedOut";
import IsLoggedIn from "./components/routing/IsLoggedIn";
import OnePlaceToCleanPage from "./pages/OnePlaceToCleanPage.jsx";
/* Components */
import Layout from "./pages/Layout/Layout";
function App() {
  //const { user } = useAuth();
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<IsLoggedOut />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<IsLoggedIn />}>
            <Route path="/user" element={<ProfilePage />} />
            <Route path="/app" element={<AppPage />} />
            <Route
              path="/getaplace/:placeId"
              element={<OnePlaceToCleanPage />}
            />
          </Route>
          <Route element={<IsAdmin />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
