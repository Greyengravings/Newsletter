import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../context/ThemeContext';
import { login } from '../features/auth/authSlice';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function CombinedLoginPage() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('user'); // 'user' or 'admin'
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // Only for Register
  const [password, setPassword] = useState('');
  const [specialId, setSpecialId] = useState(''); // Required for Admin Login & Register
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    // Basic client validation
    if (!email || !password) {
      setError('Please fill in all the required fields.');
      setIsLoading(false);
      return;
    }

    if (role === 'admin' && !specialId) {
      setError('Please enter Your Admin Key.');
      setIsLoading(false);
      return;
    }

    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

    try {
      if (isRegister) {
        if (!username) {
          setError('Please enter a username.');
          setIsLoading(false);
          return;
        }

        let response;
        if (role === 'user') {
          response = await axios.post(`${apiUrl}/user/register`, {
            username,
            email,
            password,
            role: 'user'
          });
        } else {
          // Admin registration
          response = await axios.post(`${apiUrl}/admin/register`, {
            username: email, // Backend expects email in username field for admin
            email,
            specialId,
            password,
            phoneNumber: '0000000000' // Placeholder as it was required in previous form
          });
        }

        setSuccess('Registration successful! You can now log in.');
        setIsRegister(false);
        // Reset sensitive fields
        setPassword('');
        setSpecialId('');
        setIsLoading(false);
      } else {
        // Login Logic
        let response;
        if (role === 'user') {
          response = await axios.post(`${apiUrl}/user/login`, {
            username: email, // Backend uses email as username in the login request
            password,
          });

          if (response.data.message === 'Login successful') {
            setSuccess('Login successful! Redirecting...');
            dispatch(login({
              username: response.data.user.username,
              userId: response.data.user.userId,
              role: response.data.user.role,
              token: response.data.token,
            }));
            setTimeout(() => navigate('/'), 1200);
            // We keep isLoading true until navigation
          } else {
            setIsLoading(false);
          }
        } else {
          // Admin login
          response = await axios.post(`${apiUrl}/admin/login`, {
            email,
            password,
            specialId,
          });

          if (response.data.message === 'Login successful') {
            setSuccess('Login successful! Redirecting...');
            dispatch(login({
              username: response.data.username,
              userId: response.data.userId,
              role: 'admin',
            }));
            setTimeout(() => navigate('/'), 1200);
            // We keep isLoading true until navigation
          } else {
            setIsLoading(false);
          }
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login/Registration failed.');
      setIsLoading(false);
    }
  };

  const inputClasses = `w-full p-4 rounded-2xl border focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 ${
    theme === 'dark'
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
  }`;

  return (
    <div className={`flex items-center justify-center min-h-screen py-6 transition-colors duration-500 relative`}>
      {/* Floating Home Button */}
      <button
        onClick={() => navigate('/')}
        className={`fixed top-6 left-6 z-50 flex items-center gap-2 px-6 py-3 rounded-full transition-all font-black uppercase text-xs tracking-widest shadow-xl group border ${
          theme === 'dark'
            ? 'bg-red-600 border-red-500 text-white hover:bg-red-700'
            : 'bg-red-600 border-red-500 text-white hover:bg-red-700'
        } backdrop-blur-md`}
      >
        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Home
      </button>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Column: Email Login/Signup */}
        <div className={`relative p-6 md:p-12 rounded-[2.5rem] shadow-2xl w-full overflow-hidden transition-all duration-500 ${
          theme === 'dark'
            ? 'bg-gray-800 border border-gray-700'
            : 'bg-white border border-blue-50'
        }`}>
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <header className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold mb-3 tracking-tight">
              {isRegister ? 'Join Us' : 'Welcome Back'}
            </h1>
            <div className="h-1.5 w-16 bg-blue-600 rounded-full mx-auto mb-4"></div>
            <p className="text-sm opacity-60 font-medium">
              {isRegister ? 'Create your account to start your journey' : 'Sign in to access your personalized dashboard'}
            </p>
          </header>

          {/* Role Switcher - Modern Sliding Design */}
          <div className={`mb-10 flex p-1 rounded-2xl relative ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
          }`}>
            <button
              onClick={() => setRole('user')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-colors duration-300 relative z-10 ${
                role === 'user'
                  ? (theme === 'dark' ? 'text-white' : 'text-blue-600')
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              User
              {role === 'user' && (
                <motion.div
                  layoutId="activeRole"
                  className={`absolute inset-0 rounded-xl shadow-md z-[-1] ${
                    theme === 'dark' ? 'bg-blue-600 shadow-blue-600/20' : 'bg-white shadow-md'
                  }`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-colors duration-300 relative z-10 ${
                role === 'admin'
                  ? (theme === 'dark' ? 'text-white' : 'text-blue-600')
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Admin
              {role === 'admin' && (
                <motion.div
                  layoutId="activeRole"
                  className={`absolute inset-0 rounded-xl shadow-md z-[-1] ${
                    theme === 'dark' ? 'bg-blue-600 shadow-blue-600/20' : 'bg-white shadow-md'
                  }`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          </div>

          {error && (
            <div className={`px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-center animate-pulse ${
              theme === 'dark' ? 'bg-red-900/30 text-red-400 border border-red-500/50' : 'bg-red-50 text-red-600 border border-red-100'
            }`}>
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {success && (
            <div className={`px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-center ${
              theme === 'dark' ? 'bg-green-900/30 text-green-400 border border-green-500/50' : 'bg-green-50 text-green-600 border border-green-100'
            }`}>
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegister && (
              <div className="space-y-2">
                <label className="block text-sm font-bold px-1">Username</label>
                <input
                  type="text"
                  className={inputClasses}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Pick a unique username"
                  required={isRegister}
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="block text-sm font-bold px-1">Email Address</label>
              <input
                type="email"
                className={inputClasses}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="space-y-2 relative">
              <div className="flex justify-between items-center px-1">
                <label className="block text-sm font-bold">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className={inputClasses}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <div className={`space-y-2 transition-all duration-500 ${role === 'admin' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
              <label className="block text-sm font-bold px-1">Your Admin Key</label>
              <input
                type="password"
                className={inputClasses}
                value={specialId}
                onChange={(e) => setSpecialId(e.target.value)}
                placeholder="Enter authorized key"
                required={role === 'admin'}
                tabIndex={role === 'admin' ? 0 : -1}
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 transform flex items-center justify-center gap-3 ${
                  isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                } bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20 hover:shadow-blue-600/40`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 128 128"
                    >
                      <circle
                        r="56"
                        cx="64"
                        cy="64"
                        fill="none"
                        stroke="hsla(0,0%,100%,0.2)"
                        strokeWidth="16"
                        strokeLinecap="round"
                      />
                      <path
                        className="pl__worm"
                        d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z"
                        fill="none"
                        stroke="white"
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="44 1111"
                        strokeDashoffset="10"
                      />
                    </svg>
                    <span>{isRegister ? 'Creating Account...' : 'Signing In...'}</span>
                  </>
                ) : (
                  isRegister ? 'Create Account' : 'Sign In'
                )}
              </button>
            </div>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-medium opacity-70">
              {isRegister ? 'Already have an account?' : "New to the platform?"}
              <button
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError('');
                  setSuccess('');
                }}
                className="ml-2 text-blue-600 hover:text-blue-700 hover:underline font-bold transition-all"
              >
                {isRegister ? 'Login here' : 'Register here'}
              </button>
            </p>
          </div>
        </div>

        {/* Right Column: Social Login */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-10 px-4">
          <header>
            <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 tracking-tight ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Apply For Access <br className="hidden md:block" /> with social accounts
            </h2>
            <div className="h-1.5 w-16 bg-blue-600 rounded-full mb-6 mx-auto lg:mx-0"></div>
            <p className={`text-lg opacity-60 font-medium max-w-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Quickly join our developer community using your preferred social platform.
            </p>
          </header>

          <div className="w-full max-w-md space-y-6">
            {/* Pill shaped buttons for Google and GitHub */}
            <button className={`w-full flex items-center justify-center space-x-3 py-4 rounded-full border-2 font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
              theme === 'dark'
                ? 'bg-white text-gray-900 border-white hover:bg-gray-100 shadow-xl'
                : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300 shadow-lg'
            }`}>
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <button className={`w-full flex items-center justify-center space-x-3 py-4 rounded-full border-2 font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
              theme === 'dark'
                ? 'bg-gray-900 text-white border-gray-700 hover:bg-black shadow-xl'
                : 'bg-gray-900 text-white border-gray-900 hover:bg-black shadow-lg'
            }`}>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
              </svg>
              <span>Continue with GitHub</span>
            </button>

            {/* Separator */}
            <div className="flex items-center space-x-4 py-4">
              <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-40">Or Connect With</span>
              <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            </div>

            {/* Facebook and LinkedIn Icons */}
            <div className="flex justify-center space-x-8">
              <button title="Facebook" className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 hover:rotate-6 active:scale-95 ${
                theme === 'dark'
                  ? 'bg-blue-900/20 border-blue-900/30 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                  : 'bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm'
              }`}>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </button>

              <button title="LinkedIn" className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 hover:-rotate-6 active:scale-95 ${
                theme === 'dark'
                  ? 'bg-blue-900/20 border-blue-900/30 text-blue-400 hover:bg-blue-700 hover:text-white hover:border-blue-700'
                  : 'bg-blue-50 border-blue-100 text-blue-700 hover:bg-blue-700 hover:text-white hover:border-blue-700 shadow-sm'
              }`}>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CombinedLoginPage;
