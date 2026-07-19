// src/components/Header.jsx (Updated SVG attributes for React)

import React, { useState, useContext, useEffect } from 'react';
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
  } px-4 py-1 rounded-xl transition-all duration-300`;

  // Always show hover styles when on login page
  const loginActiveClasses = `border-2 ${
    theme === 'dark'
      ? 'border-blue-400 bg-blue-400 text-gray-900' // Always show hover state
      : 'border-blue-600 bg-blue-600 text-white' // Always show hover state
  } px-4 py-1 rounded-xl transition-all duration-300`;

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
  const [profile, setProfile] = useState({ displayName: '', profilePicture: '' });
  const { theme, setTheme } = useContext(ThemeContext);
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const username = useSelector((state) => state.auth?.username);
  const role = useSelector((state) => state.auth?.role);

  const closeMenu = () => setIsMenuOpen(false);

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
    <header
      className={`sticky top-0 z-50 w-full ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } transition-colors duration-500`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center py-3 px-3">
        {/* Logo */}
        <NavLink to="/" onClick={closeMenu}>
          <AnimatedTitle />
        </NavLink>

        {/* Hamburger Menu - Mobile */}
        <div className="md:hidden flex items-center space-x-3">
          {/* Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`focus:outline-none ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            } focus:text-blue-600`}
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <NavItem to="/" theme={theme}>Home</NavItem>
          <NavItem to="/about" theme={theme}>About</NavItem>
          <NavItem to="/portfolio" theme={theme}>Dev's Portfolio</NavItem>
          {isLoggedIn ? (
            <NavLink to={role === 'admin' ? '/admin-dashboard' : '/user-profile'} onClick={closeMenu} className="flex items-center space-x-2">
              <img
                src={profile.profilePicture || DefaultProfileImg}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold`}>
                {profile.displayName || username || 'Profile'}
              </span>
            </NavLink>
          ) : (
            <NavItem to="/login" theme={theme}>Login</NavItem>
          )}

          {/* Settings Icon in Desktop */}
          <button
            onClick={() => setShowThemeToggle(!showThemeToggle)}
            className={`focus:outline-none transition-colors ${
             theme === 'dark' ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
            }`}
            title="Toggle Theme"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.003 21c-.732.001-1.465-.438-1.678-1.317a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37c1 .608 2.296.07 2.572-1.065c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c.886.215 1.325.957 1.318 1.694" />
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0" />
              <path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
              <path d="M19.001 15.5v1.5" />
              <path d="M19.001 21v1.5" />
              <path d="M22.032 17.25l-1.299.75" />
              <path d="M17.27 20l-1.3.75" />
              <path d="M15.97 17.25l1.3.75" />
              <path d="M20.733 20l1.3.75" />
            </svg>
          </button>
        </nav>
      </div>

      {/* Theme Toggle Slider - appears when clicked */}
      {showThemeToggle && (
        <div className={`flex justify-end pr-4 pb-2 shadow-md ${
          theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        } transition-colors duration-500`}>
          <label className="relative inline-flex items-center cursor-pointer mt-2">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === 'dark'}
              onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
            <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
            <div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full
                transition-transform transform peer-checked:translate-x-6"></div>
            <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              {theme === 'light' ? 'Light' : 'Dark'} Mode
            </span>
          </label>
        </div>
      )}

      {/* Mobile Navigation */}
      <nav
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} shadow-lg py-2 ${
          theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        } transition-colors duration-500`}
      >
        <div className="flex flex-col items-center space-y-4 px-4 pb-4">
          <NavItem to="/" onClick={closeMenu} theme={theme}>Home</NavItem>
          <NavItem to="/about" onClick={closeMenu} theme={theme}>About</NavItem>
          <NavItem to="/portfolio" onClick={closeMenu} theme={theme}>Portfolio</NavItem>
          {isLoggedIn ? (
            <NavLink to={role === 'admin' ? '/admin-dashboard' : '/user-profile'} onClick={closeMenu} className="flex items-center space-x-2">
              <img
                src={profile.profilePicture || DefaultProfileImg}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} font-semibold`}>
                {profile.displayName || username || 'Profile'}
              </span>
            </NavLink>
          ) : (
            <NavItem to="/login" onClick={closeMenu} theme={theme}>Login</NavItem>
          )}

          {/* Theme Toggle in Mobile Menu */}
          <div className="flex items-center justify-center w-full pt-2 border-t border-gray-200 dark:border-gray-700">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={theme === 'dark'}
                onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              />
              <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
              <div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full
                  transition-transform transform peer-checked:translate-x-6"></div>
              <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                {theme === 'light' ? 'Light' : 'Dark'} Mode
              </span>
            </label>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
