// src/components/Header.jsx (Updated SVG attributes for React)

import React, { useState, useContext, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AnimatedTitle from './AnimatedTitle';
import { ThemeContext } from '../context/ThemeContext'; // import theme context
import axios from 'axios';
import DefaultProfileImg from '/DefaultProfileImg.jpeg';

// Helper to style NavLinks with theme-aware colors
const NavItem = ({ to, children, onClick, theme }) => {
  const location = useLocation();
  const isOnLoginPage = location.pathname === '/login';

  const baseClasses = `relative group transition-colors duration-300 ${
    theme === 'dark' ? 'text-white' : 'text-gray-900'
  }`;
  const activeClasses = theme === 'dark' ? 'text-blue-400 font-semibold' : 'text-blue-600 font-semibold';
  const loginClasses = `border-2 ${
    theme === 'dark'
      ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900'
      : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
  } px-4 py-1 rounded-full transition-all duration-300`;

  // Always show hover styles when on login page
  const loginActiveClasses = `border-2 ${
    theme === 'dark'
      ? 'border-blue-400 bg-blue-400 text-gray-900' // Always show hover state
      : 'border-blue-600 bg-blue-600 text-white' // Always show hover state
  } px-4 py-1 rounded-full transition-all duration-300`;

  const isLoginLink = to === '/login';

  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        if (isLoginLink) {
          return isOnLoginPage ? loginActiveClasses : loginClasses;
        }
        return `${baseClasses} ${isActive ? activeClasses : theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600'} flex items-center h-full`;
      }}
      onClick={onClick}
    >
      {({ isActive }) => (
        <>
          <span>{children}</span>
          {!isLoginLink && (
            <span
              className={`absolute -bottom-0.5 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                isActive ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          )}
        </>
      )}
    </NavLink>
  );
};

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showThemeToggle, setShowThemeToggle] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [profile, setProfile] = useState({ displayName: '', profilePicture: '' });
  const headerRef = useRef(null);
  const {
    theme, setTheme,
    reduceBlur, setReduceBlur,
    reduceAnimations, setReduceAnimations
  } = useContext(ThemeContext);
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const username = useSelector((state) => state.auth?.username);
  const role = useSelector((state) => state.auth?.role);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setShowMoreMenu(false);
    setShowThemeToggle(false);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setShowMoreMenu(false);
        setShowThemeToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch profile data when user is logged in
  useEffect(() => {
    if (isLoggedIn && username) {
      const fetchProfile = async () => {
        try {
          const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
          if (role === 'admin') {
            const response = await axios.get(`${apiUrl}/admin/profile/${encodeURIComponent(username)}`);
            if (response.data && response.data.profile) {
              setProfile({
                displayName: response.data.profile.displayName || username,
                profilePicture: response.data.profile.profilePicture || DefaultProfileImg,
              });
            }
          } else {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${apiUrl}/user/profile`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setProfile({
              displayName: response.data.user.displayName || username,
              profilePicture: response.data.user.profilePicture || DefaultProfileImg,
            });
          }
        } catch (error) {
          console.error('Failed to fetch profile for header:', error);
          // Fallback to default values
          setProfile({
            displayName: username,
            profilePicture: DefaultProfileImg,
          });
        }
      };
      fetchProfile();
    }
  }, [isLoggedIn, username, role]);

  return (
    <header ref={headerRef} className="fixed top-4 z-50 w-full px-4 left-0 right-0">
      <div className="max-w-[90%] mx-auto relative">
        {/* Main Pill */}
        <div
          className={`transition-all duration-500 overflow-hidden shadow-lg backdrop-blur-md border rounded-full ${
            theme === 'dark'
              ? 'bg-slate-900/70 border-white/10 text-white'
              : 'bg-blue-50/70 border-blue-200/50 text-gray-900'
          }`}
        >
          <div className="flex justify-between items-center py-2 pl-4 pr-5 relative">
            {/* Logo Section */}
            <div className="flex-shrink-0 z-10">
              <NavLink to="/" onClick={closeMenu}>
                <AnimatedTitle />
              </NavLink>
            </div>

            {/* Middle Navigation - Desktop */}
            <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-10 items-center">
              <NavItem to="/" theme={theme}>Home</NavItem>
              <NavItem to="/about" theme={theme}>About</NavItem>
              <NavItem to="/categories" theme={theme}>Categories</NavItem>
              {windowWidth > 1200 && <NavItem to="/contact" theme={theme}>Contact</NavItem>}
            </nav>

            {/* Right Actions - Desktop */}
            <div className="hidden md:flex items-center space-x-4 z-10">
              {/* Grouped Auth & Subscribe Buttons with reduced gap */}
              <div className="flex items-center space-x-3">
                {isLoggedIn ? (
                  <NavLink to={role === 'admin' ? '/admin-dashboard' : '/user-profile'} onClick={closeMenu} className="flex items-center space-x-2">
                    <img
                      src={profile.profilePicture || DefaultProfileImg}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-blue-400"
                    />
                    <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold`}>
                      {profile.displayName || username || 'Profile'}
                    </span>
                  </NavLink>
                ) : (
                  <NavItem to="/login" theme={theme}>Login</NavItem>
                )}

                {/* More Button - Visible between 760px and 1200px */}
                {windowWidth <= 1200 && (
                  <button
                    onClick={() => {
                      setShowMoreMenu(!showMoreMenu);
                      setShowThemeToggle(false);
                    }}
                    className={`px-4 py-1 rounded-full border-2 font-medium transition-all duration-300 ${
                      theme === 'dark'
                        ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900'
                        : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    More
                  </button>
                )}

                {/* Subscribe Button - Only visible if width > 1200px */}
                {windowWidth > 1200 && (
                  <NavLink
                    to="/subscribe"
                    className={({ isActive }) => {
                      const baseClasses = `px-4 py-1 rounded-full border-2 transition-all duration-300 font-medium whitespace-nowrap`;
                      const filledClasses = theme === 'dark'
                        ? 'bg-blue-400 border-blue-400 text-gray-900 hover:bg-transparent hover:text-blue-400'
                        : 'bg-blue-600 border-blue-600 text-white hover:bg-transparent hover:text-blue-600';

                      const activeShadow = isActive
                        ? (theme === 'dark' ? 'shadow-lg shadow-blue-400/20' : 'shadow-lg shadow-blue-600/20')
                        : '';

                      return `${baseClasses} ${filledClasses} ${activeShadow}`;
                    }}
                    onClick={closeMenu}
                  >
                    Subscribe
                  </NavLink>
                )}
              </div>

              {/* Settings Icon - Only visible if width > 1200px */}
              {windowWidth > 1200 && (
                <button
                  onClick={() => {
                    setShowThemeToggle(!showThemeToggle);
                    setShowMoreMenu(false);
                  }}
                  className={`p-0.1 focus:outline-none transition-all duration-300 rounded-full hover:bg-black/5 dark:hover:bg-white/10 ${
                   theme === 'dark' ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
                  }`}
                  title="Toggle Theme"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Hamburger Menu - Mobile */}
            <div className="md:hidden flex items-center space-x-3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`focus:outline-none transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                } hover:text-blue-600`}
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Settings Pop-up Card */}
        {showThemeToggle && (
          <div className={`absolute top-full right-6 mt-2 p-6 shadow-2xl backdrop-blur-md border rounded-3xl transition-all duration-300 z-50 min-w-[280px] ${
            theme === 'dark'
              ? 'bg-slate-900/90 border-white/10 text-white'
              : 'bg-blue-50/90 border-blue-200/50 text-gray-900'
          }`}>
            <h3 className="text-lg font-bold mb-4 px-1">Settings</h3>

            <div className="space-y-4">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between group">
                <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">Dark Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={theme === 'dark'}
                    onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform peer-checked:translate-x-5"></div>
                </label>
              </div>

              {/* Reduce Blur */}
              <div className="flex items-center justify-between group">
                <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">Reduce Transparency</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={reduceBlur}
                    onChange={() => setReduceBlur(!reduceBlur)}
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform peer-checked:translate-x-5"></div>
                </label>
              </div>

              {/* Reduce Animations */}
              <div className="flex items-center justify-between group">
                <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">Reduce Animations</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={reduceAnimations}
                    onChange={() => setReduceAnimations(!reduceAnimations)}
                  />
                  <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform peer-checked:translate-x-5"></div>
                </label>
              </div>

              {/* User Settings Link */}
              <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700">
                <NavLink
                  to={isLoggedIn ? "/user-profile" : "/login"}
                  onClick={closeMenu}
                  className={`flex items-center justify-between p-2 rounded-xl transition-colors ${
                    theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-black/5'
                  }`}
                >
                  <span className="text-sm font-bold">User Settings</span>
                  <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </NavLink>
              </div>
            </div>
          </div>
        )}

        {/* "More" Menu Pop-up - Visible between 760px and 1200px */}
        {showMoreMenu && windowWidth <= 1200 && (
          <div className={`absolute top-full right-6 mt-2 p-6 shadow-2xl backdrop-blur-md border rounded-3xl transition-all duration-300 z-50 min-w-[200px] ${
            theme === 'dark'
              ? 'bg-slate-900/95 border-white/10 text-white'
              : 'bg-blue-50/95 border-blue-200/50 text-gray-900'
          }`}>
            <div className="flex flex-col space-y-5">
              <NavItem to="/contact" onClick={closeMenu} theme={theme}>Contact</NavItem>

              <NavLink
                to="/subscribe"
                className={({ isActive }) => {
                  const baseClasses = `px-4 py-2 rounded-full border-2 transition-all duration-300 font-bold text-center`;
                  const filledClasses = theme === 'dark'
                    ? 'bg-blue-400 border-blue-400 text-gray-900 hover:bg-transparent hover:text-blue-400'
                    : 'bg-blue-600 border-blue-600 text-white hover:bg-transparent hover:text-blue-600';

                  return `${baseClasses} ${filledClasses}`;
                }}
                onClick={closeMenu}
              >
                Subscribe
              </NavLink>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <label className="relative inline-flex items-center cursor-pointer w-full">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={theme === 'dark'}
                    onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  />
                  <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full
                      transition-transform transform peer-checked:translate-x-6"></div>
                  <span className="ml-3 text-sm font-medium">
                    {theme === 'light' ? 'Light' : 'Dark'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Card - separate from pill */}
        {isMenuOpen && (
          <nav
            className={`md:hidden mt-2 p-6 shadow-xl backdrop-blur-md border rounded-[2rem] transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-slate-900/90 border-white/10 text-white'
                : 'bg-blue-50/90 border-blue-200/50 text-gray-900'
            }`}
          >
            <div className="flex flex-col items-center space-y-4">
              <NavItem to="/" onClick={closeMenu} theme={theme}>Home</NavItem>
              <NavItem to="/about" onClick={closeMenu} theme={theme}>About</NavItem>
              <NavItem to="/categories" onClick={closeMenu} theme={theme}>Categories</NavItem>
              <NavItem to="/contact" onClick={closeMenu} theme={theme}>Contact</NavItem>
              {isLoggedIn ? (
                <NavLink to={role === 'admin' ? '/admin-dashboard' : '/user-profile'} onClick={closeMenu} className="flex items-center space-x-2">
                  <img
                    src={profile.profilePicture || DefaultProfileImg}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-400"
                  />
                  <span className="font-semibold">
                    {profile.displayName || username || 'Profile'}
                  </span>
                </NavLink>
              ) : (
                <NavItem to="/login" onClick={closeMenu} theme={theme}>Login</NavItem>
              )}

              <NavLink
                to="/subscribe"
                className={({ isActive }) => {
                  const baseClasses = `px-6 py-2 rounded-full border-2 font-bold transition-all duration-300 w-full text-center`;
                  const filledClasses = theme === 'dark'
                    ? 'bg-blue-400 border-blue-400 text-gray-900 hover:bg-transparent hover:text-blue-400'
                    : 'bg-blue-600 border-blue-600 text-white hover:bg-transparent hover:text-blue-600';

                  return `${baseClasses} ${filledClasses} ${isActive ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`;
                }}
                onClick={closeMenu}
              >
                Subscribe
              </NavLink>

              {/* Theme & Accessibility Toggles in Mobile Menu */}
              <div className="w-full pt-4 border-t border-blue-200/30 dark:border-white/10 space-y-4">
                {/* Dark Mode */}
                <div className="flex items-center justify-between px-2">
                  <span className="text-sm font-medium">Dark Mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={theme === 'dark'}
                      onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    />
                    <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform peer-checked:translate-x-5"></div>
                  </label>
                </div>

                {/* Reduce Blur */}
                <div className="flex items-center justify-between px-2">
                  <span className="text-sm font-medium">Reduce Transparency</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={reduceBlur}
                      onChange={() => setReduceBlur(!reduceBlur)}
                    />
                    <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform peer-checked:translate-x-5"></div>
                  </label>
                </div>

                {/* Reduce Animations */}
                <div className="flex items-center justify-between px-2">
                  <span className="text-sm font-medium">Reduce Animations</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={reduceAnimations}
                      onChange={() => setReduceAnimations(!reduceAnimations)}
                    />
                    <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform peer-checked:translate-x-5"></div>
                  </label>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
