import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Categories from "./pages/Categories";
import Favorites from "./pages/Favorites";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import VideoPage from "./pages/VideoPage";
import UploadVideo from "./pages/UploadVideo";
import MyUploads from "./pages/MyUploads";
import ChannelPage from "./pages/ChannelPage";
import Dashboard from "./pages/Dasboard";
import Playlists from "./pages/Playlists";

import ProtectedRoute from "./components/ProtectedRoute";
import WatchLater from "./pages/WatchLater";


function App() {
  return (
    <Routes>

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Home */}
        <Route index element={<Home />} />

        {/* Video Page */}
        <Route
          path="video/:id"
          element={<VideoPage />}
        />

        {/* Trending */}
        <Route
          path="trending"
          element={<Trending />}
        />

        {/* Categories */}
        <Route
          path="categories"
          element={<Categories />}
        />

        {/* Favorites */}
        <Route
          path="favorites"
          element={<Favorites />}
        />

        {/* History */}
        <Route
          path="history"
          element={<History />}
        />

        {/* Upload */}
        <Route
          path="upload"
          element={<UploadVideo />}
        />
        {/* Watch Later */}
        <Route
          path="watchlater"
          element={<WatchLater />}
        />


        {/* Profile */}
        <Route
          path="profile"
          element={<Profile />}
        />
      </Route>

      {/* My Uploads */}
      <Route
        path="/myuploads"
        element={<MyUploads />}
      />

      <Route path="/channel/:userId" element={<ChannelPage />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route
        path="/playlists"
        element={<Playlists />}
      />

    </Routes >
  );
}

export default App;