import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../context/ThemeContext';
import { login } from '../features/auth/authSlice';
import axios from 'axios';

function AdminLoginPage() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialId, setSpecialId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSpecialId, setShowSpecialId] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const phoneRegex = /^\d{10}$/;
  const usernameSuffix = '@blogcms.web';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic client validation
    if (!username || !password || !phoneNumber || !specialId) {
      setError('Please fill in all the required fields.');
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }

    if (!username.endsWith(usernameSuffix)) {
      setError(`Username must end with "${usernameSuffix}".`);
      return;
    }

    try {
      // Call backend login endpoint
      const response = await axios.post('http://localhost:5001/api/admin/login', {
        username,
        password,
        phoneNumber,
        specialId,
      });

      if (response.data.message === 'Login successful') {
        setSuccess('Login successful! Redirecting to admin dashboard...');
        dispatch(login({
          username: response.data.username,
          userId: response.data.userId
        }));
        setTimeout(() => {
          navigate('/admin-dashboard');
        }, 1200);
      } else {
        setError('Unexpected response from server.');
      }
    } catch (err) {
      // Show backend error message or generic error
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    }
  };

  const getInputClasses = (inputName) => {
    const baseClasses = `shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-blue-500 ${
      theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-700'
    }`;
    const highlightClasses = 'border-blue-500 ring-2 ring-blue-500';
    const borderColor =
      theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
    return `${baseClasses} ${
      focusedInput === inputName ? highlightClasses : borderColor
    }`;
  };

  return (
    <div
      className={`flex items-center justify-center min-h-[calc(100vh-64px)] p-4 transition-colors duration-500 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div
        className={`p-8 rounded-xl shadow-xl w-full max-w-md transition-colors duration-500 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>

        {error && (
          <div
            className={`border px-4 py-3 rounded relative mb-4 ${
              theme === 'dark'
                ? 'bg-red-900 border-red-500 text-red-300'
                : 'bg-red-100 border-red-400 text-red-700'
            }`}
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {success && (
          <div
            className={`border px-4 py-3 rounded relative mb-4 ${
              theme === 'dark'
                ? 'bg-green-900 border-green-500 text-green-300'
                : 'bg-green-100 border-green-400 text-green-700'
            }`}
            role="alert"
          >
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-bold mb-2">
              Username <span className="text-xs opacity-70">(e.g., yourname@blogcms.web):</span>
            </label>
            <input
              type="text"
              id="username"
              className={getInputClasses('username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setFocusedInput('username')}
              onBlur={() => setFocusedInput(null)}
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-bold mb-2">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              className={getInputClasses('phoneNumber')}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onFocus={() => setFocusedInput('phoneNumber')}
              onBlur={() => setFocusedInput(null)}
              placeholder="e.g., 9876543210"
              required
              maxLength="10"
            />
          </div>

          {/* Special ID */}
          <div className="mb-4 relative">
            <label htmlFor="specialId" className="block text-sm font-bold mb-2">Special ID Code:</label>
            <input
              type={showSpecialId ? 'text' : 'password'}
              id="specialId"
              className={`${getInputClasses('specialId')} pr-20`}
              value={specialId}
              onChange={(e) => setSpecialId(e.target.value)}
              onFocus={() => setFocusedInput('specialId')}
              onBlur={() => setFocusedInput(null)}
              placeholder="Enter your special ID code"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pt-7">
              <button
                type="button"
                onClick={() => setShowSpecialId(!showSpecialId)}
                className="text-blue-600 font-bold text-sm select-none"
              >
                {showSpecialId ? 'Hide' : 'View'}
              </button>
            </div>
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

          {/* Submit */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 w-full ${
                theme === 'dark'
                  ? 'bg-blue-400 text-gray-900' // Always show hover color (blue-400)
                  : 'bg-blue-700 text-white' // Always show hover color (blue-700)
              }`}
            >
              Login
            </button>
          </div>
        </form>

        {/* Register button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/admin-register')}
            className="text-blue-600 hover:underline font-semibold"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
