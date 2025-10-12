import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { ThemeContext } from '../context/ThemeContext';
import axios from 'axios';
import DefaultProfileImg from '/DefaultProfileImg.jpeg';

function UserProfilePage() {
  const { theme } = useContext(ThemeContext);
  const { username, userId, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ displayName: '', profilePicture: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile({
          displayName: response.data.user.displayName || username,
          profilePicture: response.data.user.profilePicture || DefaultProfileImg,
          email: response.data.user.email,
        });
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>

        <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="flex items-center mb-6">
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mr-6"
            />
            <div>
              <h2 className="text-2xl font-semibold">{profile.displayName}</h2>
              <p className="text-gray-600 dark:text-gray-400">@{username}</p>
              <p className="text-gray-600 dark:text-gray-400">Role: {role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Username:</label>
              <p className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>{username}</p>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Email:</label>
              <p className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>{profile.email}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Account Information</h3>
            <p>You are logged in as a {role}. You can view blogs and manage your bookmarks, but administrative functions are not available.</p>
            <button
              onClick={() => {
                dispatch(logout());
                navigate('/login');
              }}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
