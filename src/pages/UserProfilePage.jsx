import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { ThemeContext } from '../context/ThemeContext';
import axios from 'axios';
import DefaultProfileImg from '/DefaultProfileImg.jpeg';
import { motion, AnimatePresence } from 'framer-motion';

function UserProfilePage() {
  const { theme } = useContext(ThemeContext);
  const { username, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ displayName: '', profilePicture: '', email: '', membershipEndDate: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (role === 'admin') {
      navigate('/admin-dashboard');
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile({
          displayName: response.data.user.displayName || username,
          profilePicture: response.data.user.profilePicture || DefaultProfileImg,
          email: response.data.user.email,
          membershipEndDate: response.data.user.membershipEndDate,
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
  }, [username, role, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const generateReferralCode = () => {
    const code = `REF-${username?.toUpperCase() || 'USER'}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setReferralCode(code);
    triggerToast('Referral code generated successfully!');
  };

  const copyToClipboard = () => {
    if (!referralCode) return;
    navigator.clipboard.writeText(referralCode);
    triggerToast('Copied to clipboard!');
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-[60vh] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold animate-pulse text-lg tracking-tight">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-[60vh] ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <div className={`p-8 rounded-[2rem] text-center ${theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'}`}>
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-black mb-2">{error}</h2>
          <button onClick={() => window.location.reload()} className="text-sm font-bold underline opacity-60 hover:opacity-100">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-12 px-4 transition-all duration-500 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      {/* Custom Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold shadow-2xl flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Profile Card */}
        <div className={`lg:col-span-2 relative overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-500 ${
          theme === 'dark' ? 'bg-gray-800 border border-white/5' : 'bg-white border border-gray-100'
        }`}>

          {/* Decorative Header Background */}
          <div className={`h-32 w-full ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`} />

          <div className="px-6 pb-8 -mt-16">
            <div className="flex flex-col md:flex-row items-end md:items-center gap-6 mb-6">
              <div className="relative group">
                <div className={`w-32 h-32 rounded-[2rem] overflow-hidden border-4 shadow-xl transition-transform duration-500 group-hover:scale-105 ${
                  theme === 'dark' ? 'border-gray-800 bg-gray-900/50' : 'border-white bg-gray-50'
                }`}>
                  <img
                    src={profile.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-xl shadow-lg z-10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <div className="flex-grow pt-4">
                <h1 className="text-4xl font-black tracking-tight mb-1">{profile.displayName}</h1>
                <div className="flex flex-wrap gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                    theme === 'dark' ? 'bg-white/10 text-white/60' : 'bg-black/5 text-black/40'
                  }`}>
                    @{username}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-blue-500/10 text-blue-500">
                    {role}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-2">Email Address</p>
                <p className="font-bold text-lg break-all">{profile.email}</p>
              </div>
              <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-2">Membership Status</p>
                <p className="font-bold text-lg">
                  {profile.membershipEndDate
                    ? `Ends ${new Date(profile.membershipEndDate).toLocaleDateString()}`
                    : 'Standard User'}
                </p>
              </div>
            </div>

            {/* Account Message */}
            <div className={`p-6 rounded-[2rem] border-2 border-dashed mb-6 transition-colors ${
              theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50/50'
            }`}>
              <h3 className="text-lg font-black mb-3">Your Account</h3>
              <p className="opacity-70 leading-relaxed font-medium">
                You are currently logged in as a <strong>{role}</strong>. As a valued member, you can explore all blogs, manage your personal bookmarks, and receive updates.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleLogout}
                className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-lg rounded-2xl transition-all shadow-xl shadow-red-600/20 active:scale-[0.98]"
              >
                Logout Account
              </button>
              <button
                onClick={() => navigate('/')}
                className={`flex-1 py-4 font-black text-lg rounded-2xl transition-all active:scale-[0.98] ${
                  theme === 'dark'
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10'
                    : 'bg-black/5 hover:bg-black/10 border border-black/5'
                }`}
              >
                Back to Feed
              </button>
            </div>
          </div>
        </div>

        {/* Referral Panel Card */}
        <div className={`lg:col-span-1 p-6 rounded-[2.5rem] shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden relative ${
          theme === 'dark' ? 'bg-gray-800 border border-white/5' : 'bg-white border border-gray-100'
        }`}>
          {/* Decorative Background for Referral */}
          <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-500/5'
          }`} />

          <div className="relative z-10">
            <div className={`inline-block p-3 rounded-2xl mb-4 ${
              theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>

            <h2 className="text-2xl font-black mb-3 leading-tight">Refer a Friend & Save</h2>
            <p className="text-sm opacity-70 font-medium leading-relaxed mb-6">
              Share the love of reading! Invite your friends to join our community and unlock exclusive rewards.
            </p>

            <div className={`p-5 rounded-3xl mb-6 ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1">Your Benefit</p>
              <p className="font-bold text-lg text-blue-600 dark:text-blue-400">
                Up to 30% Discount
              </p>
              <p className="text-xs opacity-60 mt-0.5">on your next premium membership</p>
            </div>

            {referralCode && (
              <div className={`p-3 rounded-xl mb-4 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 ${
                theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'
              }`}>
                <code className="text-sm font-black text-blue-500 tracking-wider overflow-hidden text-ellipsis whitespace-nowrap">
                  {referralCode}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="p-1.5 hover:bg-blue-500/10 rounded-lg transition-colors text-blue-500"
                  title="Copy to clipboard"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={generateReferralCode}
              className={`w-full py-3 font-black text-base rounded-xl transition-all active:scale-[0.98] ${
                referralCode ? 'opacity-50 pointer-events-none' : 'hover:bg-blue-600/5'
              } ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
            >
              {referralCode ? 'Code Generated' : 'Generate a Code'}
            </button>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-base rounded-xl transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]">
              Get Referral Link
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="lg:col-span-3">
          <p className="mt-8 text-center text-sm font-bold opacity-30 px-6 leading-relaxed">
            Need help with your account? Contact our support team or check our data privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
