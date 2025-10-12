import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import axios from 'axios';

function UserRegisterPage() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSecretCode, setShowSecretCode] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const getInputClasses = (inputName) => {
    const baseClasses = `shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
      theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-700'
    }`;
    const highlightClasses = 'border-blue-500 ring-2 ring-blue-500';
    const borderColor =
      theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
    return `${baseClasses} ${
      focusedInput === inputName ? highlightClasses : borderColor
    }`;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!username || !email || !password) {
      setError('Please fill in all the required fields.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (role === 'admin' && secretCode !== 'D15C') {
      setError('Invalid secret code for admin registration.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/user/register', {
        username,
        email,
        password,
        secretCode: role === 'admin' ? secretCode : '',
      });

      setSuccess(`Registration successful! You are registered as ${response.data.role}. Redirecting to login...`);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-[calc(100vh-64px)] p-4 transition-colors duration-500 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div
        className={`p-8 rounded-lg shadow-xl w-full max-w-md transition-colors duration-500 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">User Register</h1>

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

        <form onSubmit={handleRegister}>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-bold mb-2">
              Username:
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

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              Email:
            </label>
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

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Role:</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === 'user'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                User
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                Admin
              </label>
            </div>
          </div>

          {/* Secret Code - only show if admin selected */}
          {role === 'admin' && (
            <div className="mb-4 relative">
              <label htmlFor="secretCode" className="block text-sm font-bold mb-2">
                Secret Code (required for admin rights):
              </label>
              <input
                type={showSecretCode ? 'text' : 'password'}
                id="secretCode"
                className={`${getInputClasses('secretCode')} pr-20`}
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                onFocus={() => setFocusedInput('secretCode')}
                onBlur={() => setFocusedInput(null)}
                placeholder="Enter secret code for admin rights"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pt-7">
                <button
                  type="button"
                  onClick={() => setShowSecretCode(!showSecretCode)}
                  className="text-blue-600 font-bold text-sm select-none"
                >
                  {showSecretCode ? 'Hide' : 'View'}
                </button>
              </div>
            </div>
          )}

          {/* Password */}
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={`${getInputClasses('password')} pr-20`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              placeholder="Minimum 8 characters"
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
                  ? 'bg-blue-500 hover:bg-blue-400 text-gray-900'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserRegisterPage;
