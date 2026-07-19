import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../context/ThemeContext';
import { login } from '../features/auth/authSlice';
import axios from 'axios';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic client validation
    if (!email || !password) {
      setError('Please fill in all the required fields.');
      return;
    }

    if (role === 'admin' && !specialId) {
      setError('Please enter the secret code.');
      return;
    }

    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

    if (isRegister) {
      if (!username) {
        setError('Please enter a username.');
        return;
      }

      try {
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
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed.');
      }
    } else {
      // Login Logic
      try {
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
          }
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed. Please check credentials.');
      }
    }
  };

  const getInputClasses = (inputName) => {
    const baseClasses = `shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
      theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-700'
    }`;
    const highlightClasses = 'border-blue-500 ring-2 ring-blue-500';
    const borderColor = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
    return `${baseClasses} ${focusedInput === inputName ? highlightClasses : borderColor}`;
  };

  return (
    <div className={`flex items-center justify-center min-h-[calc(100vh-64px)] p-4 transition-colors duration-500 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      <div className={`p-8 rounded-xl shadow-xl w-full max-w-md transition-colors duration-500 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isRegister ? 'Register' : 'Login'}
        </h1>

        {/* Role Selection (Radio Buttons) */}
        <div className="mb-6 flex justify-center space-x-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === 'user'}
              onChange={() => setRole('user')}
              className="mr-2 w-4 h-4 text-blue-600"
            />
            <span className="font-semibold">User</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
              className="mr-2 w-4 h-4 text-blue-600"
            />
            <span className="font-semibold">Admin</span>
          </label>
        </div>

        {error && (
          <div className={`border px-4 py-3 rounded relative mb-4 ${
            theme === 'dark' ? 'bg-red-900 border-red-500 text-red-300' : 'bg-red-100 border-red-400 text-red-700'
          }`} role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {success && (
          <div className={`border px-4 py-3 rounded relative mb-4 ${
            theme === 'dark' ? 'bg-green-900 border-green-500 text-green-300' : 'bg-green-100 border-green-400 text-green-700'
          }`} role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username (Register only) */}
          {isRegister && (
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-bold mb-2">Username:</label>
              <input
                type="text"
                id="username"
                className={getInputClasses('username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocusedInput('username')}
                onBlur={() => setFocusedInput(null)}
                placeholder="Enter username"
                required={isRegister}
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              className={getInputClasses('email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-bold mb-2">Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={`${getInputClasses('password')} pr-20`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              placeholder="******************"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pt-7">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-blue-600 font-bold text-sm select-none"
              >
                {showPassword ? 'Hide' : 'View'}
              </button>
            </div>
          </div>

          {/* Secret Code (Admin Login & Register) */}
          {role === 'admin' && (
            <div className="mb-6">
              <label htmlFor="specialId" className="block text-sm font-bold mb-2">Secret Code:</label>
              <input
                type="password"
                id="specialId"
                className={getInputClasses('specialId')}
                value={specialId}
                onChange={(e) => setSpecialId(e.target.value)}
                onFocus={() => setFocusedInput('specialId')}
                onBlur={() => setFocusedInput(null)}
                placeholder="Enter secret code"
                required={role === 'admin'}
              />
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 w-full ${
                theme === 'dark' ? 'bg-blue-400 text-gray-900' : 'bg-blue-700 text-white'
              }`}
            >
              {isRegister ? 'Register' : 'Login'} as {role === 'user' ? 'User' : 'Admin'}
            </button>
          </div>
        </form>

        {/* Toggle between Login and Register */}
        <div className="mt-6 text-center">
          <p className="text-sm">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
                setSuccess('');
              }}
              className="ml-2 text-blue-600 hover:underline font-semibold"
            >
              {isRegister ? 'Login here' : 'Register here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CombinedLoginPage;
