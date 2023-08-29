import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import Sidebar from './components/Sidebar/Sidebar';
import MobileSidebar from './components/MobileSidebar/MobileSidebar';
import FeedPage from './pages/feed/FeedPage';
import ExplorePage from './pages/explore/ExplorePage';
import ReelsPage from './pages/reels/ReelsPage';
import ProfilePage from './pages/profile/ProfilePage';
import EditProfilePage from './pages/edit-profile/EditProfilePage';
import PostDetailsPage from './pages/post-details/PostDetailsPage';
import LoginPage from './pages/login/LoginPage';
import SignupPage from './pages/signup/SignupPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';


function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }

  }, [])

  if (!true) {
    return (
      <div className="app auth-wrapper">
        <Routes>
          <Route exact path="/accounts/login" element={<LoginPage />} />
          <Route path="/accounts/emailsignup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/accounts/login" />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="app">
      {windowWidth <= 768 ? <MobileSidebar /> : <Sidebar />}
      <main>
        <Routes>
          <Route exact path="/" element={<FeedPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/reels" element={<ReelsPage />} />
          <Route exact path="/user-name" element={<ProfilePage />} />
          <Route path="/user-name/reels" element={<ProfilePage />} />
          <Route path="/user-name/tagged" element={<ProfilePage />} />
          <Route path="/accounts/edit" element={<EditProfilePage />} />
          <Route path="/p/idpost" element={<PostDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
