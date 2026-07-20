import React, { useContext, useEffect } from 'react';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/auth/authSlice';
import useIdleTimeout from './hooks/useIdleTimeout';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import AboutPage from './pages/AboutPage';
import ExplorePage from './pages/ExplorePage';
import CategoriesPage from './pages/CategoriesPage';
import ContactPage from './pages/ContactPage';
import SubscribePage from './pages/SubscribePage';
import AdminDashboard from './pages/AdminDashboard';
import CombinedLoginPage from './pages/CombinedLoginPage';
import UserProfilePage from './pages/UserProfilePage';

// Separate component to use ThemeContext
function AppContent() {
  const { theme, reduceBlur, reduceAnimations } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useIdleTimeout(isLoggedIn, () => dispatch(logout()));

  useEffect(() => {
    const classes = [
      theme === 'dark' ? 'bg-gray-900' : 'bg-white',
      reduceBlur ? 'reduce-blur' : '',
      reduceAnimations ? 'reduce-animations' : ''
    ].filter(Boolean);

    document.body.className = classes.join(' ');

    // Set background doodle based on theme
    const baseUrl = import.meta.env.MODE === 'production' ? '/Newsletter' : '';
    const doodleUrl = theme === 'dark' ? `${baseUrl}/darkdoodle.jpg` : `${baseUrl}/lightdoodle.jpg`;
    document.documentElement.style.setProperty('--doodle-url', `url(${doodleUrl})`);
  }, [theme, reduceBlur, reduceAnimations]);

  return (
      <Router basename={import.meta.env.MODE === 'production' ? '/Newsletter' : '/'}>
      <div
        className={`min-h-screen flex flex-col w-full ${
          theme === 'dark' ? 'bg-black-900 text-white' : 'bg-white text-black-900'
        }`}
      >
        <Header />

        {/* Main content area - added mt-24 to ensure it starts below the fixed floating header */}
        <main className="w-full flex-grow p-4 md:p-6 mt-24">
          {/* Inner constrained content area - matching header width */}
          <div className="max-w-[90%] mx-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/post/:postId" element={<PostPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/subscribe" element={<SubscribePage />} />
              <Route path="/login" element={<CombinedLoginPage />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/user-profile" element={<UserProfilePage />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

// App now only provides ThemeContext
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
