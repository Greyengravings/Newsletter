import React, { useContext, useEffect } from 'react';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/auth/authSlice';
import useIdleTimeout from './hooks/useIdleTimeout';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
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
import DataPrivacyPage from './pages/DataPrivacyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';

// Separate component to use ThemeContext and useLocation
function AppContent() {
  const { theme, reduceBlur, reduceAnimations } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const location = useLocation();

  useIdleTimeout(isLoggedIn, () => dispatch(logout()));

  useEffect(() => {
    // Set theme classes on the html element instead of body to allow body::before to show
    const html = document.documentElement;

    // Add prod class for CSS path overrides if in production
    if (import.meta.env.MODE === 'production') {
      html.classList.add('prod');
    }

    if (theme === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.add('light');
      html.classList.remove('dark');
    }

    const classes = [
      reduceBlur ? 'reduce-blur' : '',
      reduceAnimations ? 'reduce-animations' : ''
    ].filter(Boolean);

    document.body.className = classes.join(' ');

    // Set background doodle based on theme
    const baseUrl = import.meta.env.MODE === 'production' ? '/Newsletter' : '';
    const doodleUrl = theme === 'dark' ? `${baseUrl}/darkdoodle.jpg` : `${baseUrl}/lightdoodle.jpg`;
    document.documentElement.style.setProperty('--doodle-url', `url("${doodleUrl}")`);
  }, [theme, reduceBlur, reduceAnimations]);

  const isLoginPage = location.pathname === '/login';
  const isAboutPage = location.pathname === '/about';
  const isSubscribePage = location.pathname === '/subscribe';
  const hideHeaderFooter = isLoginPage || isAboutPage;
  const hideHeaderOnly = isSubscribePage;

  return (
    <div
      className={`min-h-screen flex flex-col w-full ${
        theme === 'dark' ? 'text-white' : 'text-black-900'
      }`}
    >
      <ScrollToTop />
      {!hideHeaderFooter && !hideHeaderOnly && <Header />}

      {/* Main content area - added mt-24 to ensure it starts below the fixed floating header */}
      <main className={`w-full flex-grow p-0 md:p-6 ${(hideHeaderFooter || hideHeaderOnly) ? 'mt-0' : 'mt-24'}`}>
        {/* Inner constrained content area - matching header width */}
        <div className="w-[95%] md:w-full md:max-w-[90%] mx-auto">
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
            <Route path="/privacy" element={<DataPrivacyPage />} />
            <Route path="/terms" element={<TermsOfUsePage />} />
          </Routes>
        </div>
      </main>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

// App now only provides ThemeContext and Router
function App() {
  return (
    <ThemeProvider>
      <Router basename={import.meta.env.MODE === 'production' ? '/Newsletter' : '/'}>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
